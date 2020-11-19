import { styled } from '../../stitches.config'
import { InputWrapper } from './InputWrapper'

export const StyledInputGroup = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-start',
	alignItems: 'flex-start',
	margin: '2rem',
	color: '$gray3',

	label: {
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '12px',
		lineHeight: '17px',
		margin: '0 0 2px 2px',
		color: '$gray1'
	},

	'& > .helperText': {
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '10px',
		lineHeight: '14px',
		color: '#828282',
		margin: '2px 0 0 2px'
	},

	':focus-within label': {
		color: '$primary'
	},

	':focus-within .helperText': {
		color: '$primary'
	},

	[`:focus-within ${InputWrapper}`]: {
		border: '2px solid $primary'
	},

	[`:hover ${InputWrapper}`]: {
		border: '2px solid $gray1'
	},

	variants: {
		type: {
			// ERROR TYPE INPUT
			error: {
				color: '$error',
				label: {
					color: '$error'
				},
				':hover label': {
					color: '$gray1'
				},
				':focus-within label': {
					color: '$error'
				},

				'&.helperText': {
					color: '$error'
				},
				':hover .helperText': {
					color: '$gray1'
				},
				':focus-within .helperText': {
					color: '$error'
				},

				[`:focus-within ${InputWrapper}`]: {
					border: '2px solid $error'
				}
			},
			// DISABLED TYPE INPUT
			disabled: {
				pointerEvents: 'none',
				[`${InputWrapper}`]: {
					background: '$gray6',
					border: '2px solid $gray5'
				}
			}
		},
		size: {
			// SMALL SIZE STYLES
			sm: {
				[`${InputWrapper}`]: {
					padding: '0.625rem 0.75rem'
				}
			},

			// MEDIUM SIZE STYLES
			md: {
				[`${InputWrapper}`]: {
					padding: '1.125rem 0.75rem'
				}
			}
		},
		fullWidth: {
			fullWidth: {
				width: '100%'
			}
		}
	}
})
