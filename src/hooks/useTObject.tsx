'use client';

import { JSX, useMemo } from 'react';
import { useMessagesContext } from '@/providers/MessagesContext';
import ReactMarkdown from 'react-markdown';

type RendererMap = Record<string, (node: any, key: number, params: Record<string, any>) => JSX.Element>;
type Params = Record<string, any>;

export function useTObject(namespace: string, hookParams: Params = {}) {
  const messages = useMessagesContext();

  const t = useMemo(() => {
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
