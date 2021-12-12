import { Box, useColorModeValue } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const ClipPath = () => {
	return (
		<Svg
			viewBox="0 0 1200 120"
			style={{
				position: 'relative',
				width: 1.63 * width + 3,
				height: 0.785 * height,
			}}
		>
			<Path
				d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z"
				fill={useColorModeValue('#fafaf9', '#292524')}
			/>
		</Svg>
	);
};

export const Hero: React.FC<{}> = ({}) => {
	return (
		<>
			<Svg viewBox="0 0 540 960" width={540} height={600}>
				<Path
					d="M0 33h39v-9h39v13h39v18h79V33h39v9h39v18h39V42h39v27h39V42h39v18h40V24h39v22h39v-9h39v18h39V24h39v27h39V28h39v14h79V24h78v18V0H0z"
					fill="#fa7268"
				/>
				<Path
					d="M0 51h39v22h39V60h39v36h40v9h39V78h39v18h39v-9h39V60h39v31h39v5h39v13h40V51h39v27h39v-9h39v31h39V60h39v27h39V46h39v27h40v14h39V46h39v14h39v4-42h-78v18h-79V26h-39v23h-39V22h-39v31h-39V35h-39v9h-39V22h-39v36h-40V40h-39v27h-39V40h-39v18h-39V40h-39v-9h-39v22h-79V35H78V22H39v9H0z"
					fill="#ef6467"
				/>
				<Path
					d="M0 226h39v-81h39v-27h39v68h40v-18h39v4h39v50h39v-32h39v-27h39v77h39v4h39v-72h40v-54h39v99h39v-63h39v59h39v18h39v-50h39v27h39v18h40v-9h39v-9h39v-81h39v63V58h-39V44h-39v41h-39V71h-40V44h-39v41h-39V58h-39v40h-39V67h-39v9h-39V49h-39v58h-40V94h-39v-5h-39V58h-39v27h-39v9h-39V76h-39v27h-39v-9h-40V58H78v13H39V49H0z"
					fill="#e45765"
				/>
				<Path
					d="M0 253h39v-58h39v4h39v45h40v-36h39v14h39v58h39v-18h39v-45h39v90h39v-36h39v-40h40v-54h39v81h39v-77h39v72h39v23h39v-63h39v72h39v-18h40v-23h39v-4h39v-45h39v54-124h-39v81h-39v9h-39v9h-40v-18h-39v-27h-39v50h-39v-18h-39v-59h-39v63h-39v-99h-39v54h-40v72h-39v-4h-39v-77h-39v27h-39v32h-39v-50h-39v-4h-39v18h-40v-68H78v27H39v81H0z"
					fill="#d84a64"
				/>
				<Path
					d="M0 325h39v36h39v-40h39v27h40v-23h39v9h78v14h39v22h39v-9h39v-36h39v14h40v22h39v-40h39v-5h39v36h39v5h39v-14h39v5h39v4h40v-4h39v-14h39v-18h39v32-155h-39v45h-39v4h-39v23h-40v18h-39v-72h-39v63h-39v-23h-39v-72h-39v77h-39v-81h-39v54h-40v40h-39v36h-39v-90h-39v45h-39v18h-39v-58h-39v-14h-39v36h-40v-45H78v-4H39v58H0z"
					fill="#cb3d62"
				/>
				<Path
					d="M0 415h117v-13h40v18h39v-9h117v18h39v-14h39v5h39v-18h40v9h78v-9h39v22h39v-22h39v4h39v18h39v-9h40v18h39v-9h39v-22h39v31-119h-39v18h-39v14h-39v4h-40v-4h-39v-5h-39v14h-39v-5h-39v-36h-39v5h-39v40h-39v-22h-40v-14h-39v36h-39v9h-39v-22h-39v-14h-78v-9h-39v23h-40v-27H78v40H39v-36H0z"
					fill="#be3061"
				/>
				<Path
					d="M0 451h900v-51h-39v22h-39v9h-39v-18h-40v9h-39v-18h-39v-4h-39v22h-39v-22h-39v9h-78v-9h-40v18h-39v-5h-39v14h-39v-18H196v9h-39v-18h-40v13H0z"
					fill="#b0235f"
				/>
			</Svg>
			<Box position="relative">
				<Box
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: '100%',
						overflow: 'hidden',
						transform: [{ rotateZ: '180deg' }],
					}}
				>
					<ClipPath />
				</Box>
			</Box>
		</>
	);
};
