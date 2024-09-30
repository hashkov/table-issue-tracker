import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 14,
  color = 'currentColor',
  className = '',
}) => {
  const [svgContent, setSvgContent] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(`/assets/icons/${name}.svg`);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error(`Error loading SVG: ${name}`, error);
      }
    };

    loadSvg();
  }, [name]);

  if (!svgContent) {
    return null;
  }

  const modifiedSvg = svgContent
    .replace(/<svg/, `<svg width="${size}" height="${size}"`)
    .replace(/fill="[^"]*"/g, `fill="${color}"`)
    .replace(/<path /g, `<path fill="${color}" `);

  return (
    <span
      className={className}
      style={{ display: 'inline-block', width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: modifiedSvg }}
    />
  );
};

export default Icon;
