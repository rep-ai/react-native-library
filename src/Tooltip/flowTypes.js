// @flow
export type TooltipProps = {|
    description: string,
    trianglePosition: 'top' | 'right' | 'bottom' | 'left' | 'none',
    visible?: bool,
    offset?: number,
    title?: string,
    onClose?: () => void,
|}
