import { memo } from 'react';

interface PointElementProps {
  elementId: string;
  activeElementId?: string;
  active: boolean;
  height?: number;
}

function getPointImagePath(elementId: string, active: boolean, activeElementId?: string) {
  return activeElementId
    ? active
      ? `/burger/${activeElementId}.png`
      : `/burger/${elementId}.png`
    : active
    ? `/burger/${elementId}.png`
    : `/burger/empty-${elementId}.png`;
}

export const PointElement = memo(function (props: PointElementProps) {
  const pointImage = getPointImagePath(props.elementId, props.active, props.activeElementId);

  return <img src={pointImage} />;
});
