/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type WithTooltipProps<P> = P & {
  id: string;
  tooltip: string;
  show?: number;
  hide?: number;
}

type ClassComponent<P> = {
  new (props: Readonly<P>, context?: any): React.Component;
}

function withTooltip<P>(Comp: React.FC<P> | ClassComponent<P>): React.FC<WithTooltipProps<P>> {
  return (props: WithTooltipProps<P>): ReturnType<React.FC> => {
    const {
      show = 250, hide = 400, id, tooltip,
    } = props;

    const delay = { show, hide };
    const overlay = <Tooltip id={id}>{tooltip}</Tooltip>;

    const compProps = props as unknown as P;


    return (
      <OverlayTrigger delay={delay} overlay={overlay}>
        <Comp {...compProps} />
      </OverlayTrigger>
    );
  };
}

export default withTooltip;
