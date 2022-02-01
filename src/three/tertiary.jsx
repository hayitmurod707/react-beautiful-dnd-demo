import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BurgerMenu from '../burger-menu.svg';

const Container = styled.div`
	user-select: none;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	width: 100%;
	& .tertiary-title {
		width: calc(100% - 36px);
		padding: 8px;
		margin: 10px 0 0 20px;
		font-weight: 700;
		font-size: 14px;
		border-radius: 8px;
		border: 1px solid ${p => (p.isDragging ? 'transparent' : 'lightgrey')};
		background: white;
		display: flex;
		box-shadow: ${p =>
			p.isDragging ? '12px 12px 15px #ebebeb, -12px -12px 15px #ffffff' : '0'};
		& img {
			width: 24px;
			height: 24px;
			margin: 0 10px 0 0;
		}
		& .tertiary-name {
			margin: 3px 0 0 0;
		}
	}
`;

const Tertiary = ({ child, primaryIndex, secondaryIndex, index }) => (
	<Container>
		<Draggable
			draggableId={`tertiaryDraggableId${primaryIndex}-${secondaryIndex}-${index}`}
			index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					className="tertiary-title"
					isDragging={snapshot.isDragging}
					{...provided.draggableProps}
					key={index}>
					<img src={BurgerMenu} {...provided.dragHandleProps} />
					<div className="tertiary-name">{child.name}</div>
				</div>
			)}
		</Draggable>
	</Container>
);
export default Tertiary;
