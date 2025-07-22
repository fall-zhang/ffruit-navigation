import type { JSX, ReactElement, ReactNode } from 'react'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment, useEffect, useState } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki/bundle/web'
import type { BundledLanguage } from 'shiki/bundle/web'
type CodeProps = {
  code: string
  lang: BundledLanguage
}

export type SupportLangs = BundledLanguage

export function HighlightCode ({ code, lang }:CodeProps): ReactNode {
  const [highlightedCode, setHighlightedCode] = useState<ReactElement | null>(null)
  useEffect(() => {
    let isMounted = true
    codeToHast(code, {
      lang,
      theme: 'github-dark'
    }).then((res) => {
      if (isMounted) {
        const result = toJsxRuntime(res, {
          Fragment,
          jsx,
          jsxs
        }) as JSX.Element
        setHighlightedCode(result)
      }
    }).catch((error) => {
      console.error('代码高亮失败:', error)
      if (isMounted) {
        setHighlightedCode(<pre>{code}</pre>)
      }
    })

    return () => {
      isMounted = false
    }
  }, [code, lang])
  // const out = await codeToHast(code, {
  //   lang,
  //   theme: 'github-dark'
  // })

  // return toJsxRuntime(out, {
  //   Fragment,
  //   jsx,
  //   jsxs
  // }) as JSX.Element
  return highlightedCode || ''
}
