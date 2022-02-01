import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	& .list {
		background: white;
		padding: 8px;
		transition: 400ms;
		width: 320px;
		border-radius: 5px;
		& .list-item {
			padding: 12px;
			font-weight: 700;
			display: flex;
			margin: 0 0 8px 0;
			background: white;
			border-radius: 5px;
			border: 1px solid lightgrey;
			& img {
				width: 24px;
				height: 24px;
				margin-right: 10px;
			}
			& .item-name {
				display: inline-block;
				margin: 2px 0 0 0;
			}
		}
		& .dragging {
			background: lightgreen;
		}
	}
	& .dragging-over {
		background-color: skyblue;
	}
`;
