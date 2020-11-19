import { createStyled } from '@stitches/react'

export const { styled, css } = createStyled({
	prefix: '',
	tokens: {
		colors: {
			$gray1: '#333333',
			$gray3: '#828282',
			$gray5: '#e0e0e0',
			$gray6: '#f2f2f2',
			$primary: '#2962ff',
			$error: '#d32f2f'
		}
	},
	breakpoints: {},
	utils: {}
})
