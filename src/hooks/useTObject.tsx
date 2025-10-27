'use client';

import TemplateMarkdown from '@/components/TemplateMarkdown';
import { useLocaleContext } from '@/providers/LocaleProvider';
import React from 'react';
import { JSX, useMemo } from 'react';

/**
 * Tipos para mapear renderizadores de nós de mensagens.
 * Cada tipo de nó (string, link, markdown, ul, etc.) deve ter uma função
 * que recebe o nó, uma key para React e parâmetros de interpolação.
 */
type RendererMap = Record<string, (node: any, key: string, params: Record<string, any>) => JSX.Element>;

type Params = Record<string, any>;

export type TObjectType = JSX.Element | null;
export type TObjectFn = (keyPath: string, callParams?: Params) => TObjectType;

export type TableNode = { header: string[]; rows: string[][] | { categoria: string; grouped: string[][] }[] };

/**
 * Hook customizado para retornar funções de renderização de mensagens
 * baseadas em um namespace específico.
 *
 * Suporta:
 * - Interpolação de parâmetros `{param}` nas strings.
 * - Renderização de nós estruturados (`string`, `link`, `markdown`, `ul`, etc.).
 *
 * @param namespace Namespace das mensagens (ex: 'home/cbsoft', 'common').
 * @param hookParams Parâmetros padrão para interpolação.
 * @returns Função `tObject` que recebe um path da mensagem e retorna JSX.
 */
export function useTObject(namespace: string, hookParams: Params = {}) {
  const { messages } = useLocaleContext();

  const t = useMemo(() => {
    /**
     * Substitui placeholders `{param}` em uma string pelos valores fornecidos.
     *
     * @param str String original contendo placeholders
     * @param params Parâmetros para interpolação
     * @returns String interpolada
     */
    function interpolate(str: string, params: Record<string, any>): string {
      if (!str || typeof str !== 'string') return '';
      return str.replace(/\{\s*(\w+)\s*\}/g, (_, p) => params[p] ?? `{${p}}`);
    }

    const renderers: RendererMap = {
      string: (node, key, params) => <span key={key}>{interpolate(node, params)}</span>,
      link: (node, key, params) => (
        <a key={key} href={node.href}>
          {interpolate(node.label, params)}
        </a>
      ),
      markdown: (node, key, params) => {
        const content = Array.isArray(node.conteudo) ? node.conteudo.join('\n\n') : node.conteudo;

        return <TemplateMarkdown key={key}>{interpolate(content, params)}</TemplateMarkdown>;
      },
      ul: (node, key, params) => (
        <ul key={key}>
          {node.itens.map((item: any, i: number) => (
            <li key={i}>{renderNode(item, i.toString(), params)}</li>
          ))}
        </ul>
      ),
      table: (node: TableNode, key, params) => {
        return (
          <table className='table table-hover'>
            <thead>
              <tr>
                {node.header.map((header: string, index: number) => (
                  <th key={`${key}-header-${index}`} style={{ minWidth: '200px' }}>
                    {interpolate(header, params)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {node.rows.map((row, rowIndex) => {
                if (Array.isArray(row)) {
                  return (
                    <tr key={`${key}-row-${rowIndex}`}>
                      {row.map((item, itemIndex) => (
                        <td key={`${key}-row-${rowIndex}-${itemIndex}`}>{interpolate(item, params)}</td>
                      ))}
                    </tr>
                  );
                } else {
                  return row.grouped.map((items, itemIndex) => {
                    return (
                      <tr key={`${key}-row-${rowIndex}-${itemIndex}`}>
                        {itemIndex === 0 ? (
                          <td key={`${key}-row-${rowIndex}-${itemIndex}`} rowSpan={row.grouped.length}>
                            {interpolate(row.categoria, params)}
                          </td>
                        ) : (
                          <></>
                        )}
                        {items.map((item, valueIndex) => (
                          <td key={`${key}-row-${rowIndex}-${itemIndex}-${valueIndex}`}>{interpolate(item, params)}</td>
                        ))}
                      </tr>
                    );
                  });
                }
              })}
            </tbody>
          </table>
        );
      },
    };

    function renderNode(node: any, key: string, params: Params = {}): JSX.Element {
      if (typeof node === 'string') return renderers.string(node, key, params);
      if (Array.isArray(node))
        return (
          <React.Fragment key={key}>
            {node.map((n, i) => renderNode(n, i.toString(), params))}
            <br />
            <br />
          </React.Fragment>
        );
      if (node?.tipo && renderers[node.tipo]) return renderers[node.tipo](node, key, params);
      return <></>;
    }

    return function tObject(keyPath: string, callParams: Params = {}): TObjectType {
      const finalParams = { ...hookParams, ...callParams };
      const fullPath = namespace ? `${namespace}.${keyPath}` : keyPath;

      const parts = fullPath.split('.');
      let value: any = messages;
      for (const part of parts) {
        value = value?.[part];
        if (value === undefined) return null;
      }

      if (value === undefined) {
        console.warn(`Mensagem não encontrada: ${namespace}.${keyPath}`);
        return null;
      }

      if (Array.isArray(value)) return <>{value.map((v, i) => renderNode(v, i.toString(), finalParams))}</>;
      return renderNode(value, fullPath, finalParams);
    };
  }, [messages, namespace, hookParams]);

  return t;
}
