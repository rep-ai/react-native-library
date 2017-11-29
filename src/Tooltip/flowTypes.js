// @flow
export type TooltipProps = {|
    description: string,
    trianglePosition: 'top' | 'right' | 'bottom' | 'left' | 'none',
    visible?: bool,
    title?: string,
    onClose?: () => void,
|}
