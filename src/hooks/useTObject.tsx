'use client';

import { useLocaleContext } from '@/providers/LocaleProvider';
import { JSX, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Tipos para mapear renderizadores de nós de mensagens.
 * Cada tipo de nó (string, link, markdown, ul, etc.) deve ter uma função
 * que recebe o nó, uma key para React e parâmetros de interpolação.
 */
type RendererMap = Record<string, (node: any, key: number, params: Record<string, any>) => JSX.Element>;

type Params = Record<string, any>;

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

        return <ReactMarkdown key={key}>{interpolate(content, params)}</ReactMarkdown>;
      },
      ul: (node, key, params) => (
        <ul key={key}>
          {node.itens.map((item: any, i: number) => (
            <li key={i}>{renderNode(item, i, params)}</li>
          ))}
        </ul>
      ),
    };

    function renderNode(node: any, key: number, params: Params = {}): JSX.Element {
      if (typeof node === 'string') return renderers.string(node, key, params);
      if (Array.isArray(node)) return <>{node.map((n, i) => renderNode(n, i, params))}</>;
      if (node?.tipo && renderers[node.tipo]) return renderers[node.tipo](node, key, params);
      return <></>;
    }

    return function tObject(keyPath: string, callParams: Params = {}): JSX.Element | null {
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

      if (Array.isArray(value)) return <>{value.map((v, i) => renderNode(v, i, finalParams))}</>;
      return renderNode(value, 0, finalParams);
    };
  }, [messages, namespace, hookParams]);

  return t;
}
