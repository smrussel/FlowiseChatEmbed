import { createSignal, Show } from 'solid-js';
import { XIcon } from '../../../components/icons';

const defaultTooltipMessage = 'Hi There 👋!';
const defaultTooltipBackgroundColor = 'black';
const defaultTooltipTextColor = 'white';
const defaultTooltipFontSize = 16; // Default font size for tooltip

type TooltipProps = {
  showTooltip: boolean;
  position: { bottom: number; right: number };
  buttonSize: number;
  tooltipMessage?: string;
  tooltipBackgroundColor?: string;
  tooltipTextColor?: string;
  tooltipFontSize?: number; // Add tooltipFontSize to props
  showCloseButton?: boolean;
  showCloseSign?: boolean;
  onClose?: () => void;
};

const Tooltip = (props: TooltipProps) => {
  const [isDismissed, setIsDismissed] = createSignal(false);

  const tooltipMessage = () => props.tooltipMessage ?? defaultTooltipMessage;
  const backgroundColor = () => props.tooltipBackgroundColor ?? defaultTooltipBackgroundColor;
  const textColor = () => props.tooltipTextColor ?? defaultTooltipTextColor;
  const fontSize = () => `${props.tooltipFontSize ?? defaultTooltipFontSize}px`;
  const showCloseButton = () => props.showCloseButton ?? props.showCloseSign ?? true;

  // Generate tooltip text with line breaks if needed
  const formattedTooltipMessage = () => {
    const msg = tooltipMessage();
    return msg.length > 20
      ? msg
          .split(' ')
          .reduce<string[][]>(
            (acc, curr) => {
              const last = acc[acc.length - 1];
              if (last && last.join(' ').length + curr.length <= 20) {
                last.push(curr);
              } else {
                acc.push([curr]);
              }
              return acc;
            },
            [[]],
          )
          .map((arr) => arr.join(' '))
          .join('\n')
      : msg;
  };

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    props.onClose?.();
  };

  return (
    <Show when={props.showTooltip && !isDismissed()}>
      <div
        class="tooltip"
        style={{
          right: `calc(${props.position.right}px + 20px)`,
          bottom: `${props.position.bottom + props.buttonSize + 10}px`,
          '--tooltip-background-color': backgroundColor(),
          '--tooltip-text-color': textColor(),
          '--tooltip-font-size': fontSize(),
        }}
      >
        <span class="tooltip-message">{formattedTooltipMessage()}</span>
        <Show when={showCloseButton()}>
          <button
            type="button"
            class="tooltip-close"
            onClick={handleClose}
            aria-label="Close tooltip"
            title="Close"
          >
            <XIcon isCurrentColor={true} width={14} height={14} />
          </button>
        </Show>
      </div>
    </Show>
  );
};

export default Tooltip;
