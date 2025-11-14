interface PointElementProps {
  elementId: string;
  activeElementId?: string;
  index: number;
  active: boolean;
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

export function PointElement(props: PointElementProps) {
  const pointImage = getPointImagePath(props.elementId, props.active, props.activeElementId);

  return <img data-points={props.index} style={{ color: 'white' }} src={pointImage} />;
}
