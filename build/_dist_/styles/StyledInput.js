import { styled } from '../../stitches.config.js'

export const StyledInput = styled('input', {
	fontFamily: `'Noto Sans JP', sans-serif`,
	fontSize: '14px',
	fontWeight: 500,
	lineHeight: '20px',
	border: 'none',
	outline: 'none',
	borderRadius: '8px',
	color: '$gray1',
	width: '100%',
	transition: 'border 0.1s ease-in-out, outline 0.2s ease-in-out',

	'::placeholder': {
		color: '$gray3',
		lineHeight: '20px'
	}
})
