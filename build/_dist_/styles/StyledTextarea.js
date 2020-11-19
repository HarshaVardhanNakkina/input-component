import { styled } from '../../stitches.config.js'

export const StyledTextarea = styled('textarea', {
	fontFamily: `'Noto Sans JP', sans-serif`,
	fontSize: '16px',
	fontWeight: 500,
	lineHeight: '20px',
	border: 'none',
	outline: 'none',
	borderRadius: '8px',
	color: '$gray1',
	width: '100%',
	transition: 'border 0.1s ease-in-out, outline 0.2s ease-in-out',

	'::placeholder': {
		color: '$gray3'
	}
})
