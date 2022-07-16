import styled from 'styled-components';
export const Container = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	& .view-sections-button {
		border-radius: 8px;
		border: none;
		padding: 0 15px;
		background: skyblue;
		font-size: 16px;
		font-weight: 500;
		margin: 0 0 20px 0;
		height: 44px;
	}
	& .list {
		background: white;
		border-radius: 5px;
		padding: 8px;
		transition: 400ms;
		width: 320px;
		&[data-dragging-over='dragging-over'] {
			background-color: skyblue;
		}
		& .list-item {
			background: white;
			border-radius: 5px;
			border: 1px solid lightgrey;
			display: flex;
			font-weight: 700;
			margin: 0 0 8px 0;
			padding: 12px;
			&[data-dragging='dragging'] {
				background: lightgreen;
			}
			& img {
				height: 24px;
				margin-right: 10px;
				width: 24px;
			}
			& .item-name {
				display: inline-block;
				margin: 2px 0 0 0;
			}
		}
	}
`;
