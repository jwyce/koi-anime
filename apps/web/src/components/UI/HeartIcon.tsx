import React from 'react';

interface HeartIconProps {
	rank?: number;
	size?: number;
}

const GetSVGBackground = (rank: number) => {
	if (rank > 100) {
		return '#7c7c7c';
	} else if (rank <= 5) {
		return 'url(#rainbow)';
	} else if (rank <= 10) {
		return 'url(#shiny)';
	} else if (rank <= 25) {
		return '#ff8450';
	} else if (rank <= 50) {
		return '#e6657e';
	} else if (rank <= 100) {
		return '#8c5e96';
	}

	return '#000';
};

export const HeartIcon: React.FC<HeartIconProps> = ({ rank, size = 48 }) => {
	if (!rank || rank > 1000) {
		return <></>;
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
		>
			<defs>
				<linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="10%" stopColor="#ff0000" stopOpacity={1} />
					<stop offset="25%" stopColor="#ff9a00" stopOpacity={1} />
					<stop offset="35%" stopColor="#dedb21" stopOpacity={1} />
					<stop offset="45%" stopColor="#4adc62" stopOpacity={1} />
					<stop offset="55%" stopColor="#3f63da" stopOpacity={1} />
					<stop offset="65%" stopColor="#c10cf8" stopOpacity={1} />
					<stop offset="75%" stopColor="#fb0781" stopOpacity={1} />
					<stop offset="90%" stopColor="#ff0000" stopOpacity={1} />
				</linearGradient>
				<linearGradient id="shiny" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="15%" stopColor="#ff8450" stopOpacity={1} />
					<stop offset="23%" stopColor="#fb7761" stopOpacity={1} />
					<stop offset="32%" stopColor="#f36c70" stopOpacity={1} />
					<stop offset="41%" stopColor="#e6657e" stopOpacity={1} />
					<stop offset="49%" stopColor="#d56189" stopOpacity={1} />
					<stop offset="55%" stopColor="#bf5f92" stopOpacity={1} />
					<stop offset="63%" stopColor="#a65f96" stopOpacity={1} />
					<stop offset="67%" stopColor="#8c5e96" stopOpacity={1} />
					<stop offset="75%" stopColor="#6a5c8f" stopOpacity={1} />
					<stop offset="84%" stopColor="#4c5881" stopOpacity={1} />
					<stop offset="92%" stopColor="#38516d" stopOpacity={1} />
					<stop offset="100%" stopColor="#2f4858" stopOpacity={1} />
				</linearGradient>
			</defs>
			<path
				fill={GetSVGBackground(rank)}
				d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
			/>
			<text
				x="50%"
				y="50%"
				fontSize="x-small"
				fill="white"
				dominantBaseline="middle"
				textAnchor="middle"
				fontWeight="bolder"
				letterSpacing={0}
			>
				#{rank}
			</text>
		</svg>
	);
};
