type TooltipProps = {
    showTooltip: boolean;
    position: {
        bottom: number;
        right: number;
    };
    buttonSize: number;
    tooltipMessage?: string;
    tooltipBackgroundColor?: string;
    tooltipTextColor?: string;
    tooltipFontSize?: number;
    showCloseButton?: boolean;
    showCloseSign?: boolean;
    onClose?: () => void;
};
declare const Tooltip: (props: TooltipProps) => import("solid-js").JSX.Element;
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map