import styled from 'styled-components';

const IconContainer = ({ className, id, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size }) => size};
	margin: ${({ margin }) => margin};
	line-height: ${({ lineheight }) => lineheight};
	color: ${({ disabled }) => (disabled ? '#ccc;' : '#000;')}
	cursor: ${({ disabled }) => (disabled ? 'default;' : 'pointer;')}
	cursor: ${({ noPointer }) => (noPointer ? 'default;' : 'pointer;')}
`;
