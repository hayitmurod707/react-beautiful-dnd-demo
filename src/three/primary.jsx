import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BurgerMenu from '../burger-menu.svg';
import Secondary from './secondary.jsx';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 0 10px 0;
	border-radius: 8px;
	padding: 10px;
	background: white;
	width: 100%;
	border: 1px solid;
	border-color: ${p => (p.isDragging ? 'transparent' : 'lightgrey')};
	box-shadow: ${p =>
		p.isDragging ? '12px 12px 15px #ebebeb, -12px -12px 15px #ffffff' : '0'};
	& .primary-title {
		width: calc(100% - 18px);
		padding: 8px;
		border-radius: 8px;
		font-weight: 700;
		font-size: 16px;
		border: 1px solid lightgrey;
		display: flex;
		& img {
			width: 24px;
			height: 24px;
			margin-right: 10px;
		}
		& .primary-name {
			margin: 3px 0 0 0;
		}
	}
`;

const Primary = ({ index, name, childs }) => (
	<Draggable draggableId={`primaryDraggableId${index}`} index={index}>
		{({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
			<Container
				ref={innerRef}
				isDragging={snapshot.isDragging}
				{...draggableProps}>
				<div className="primary-title" isDragging={snapshot.isDragging}>
					<img {...dragHandleProps} src={BurgerMenu} />
					<div className="primary-name">{name}</div>
				</div>
				<Droppable
					type="secondary"
					direction="vertical"
					droppableId={`${index}-droppableSecondaryId`}>
					{({ innerRef, droppableProps, placeholder }, snapshot) => (
						<div
							ref={innerRef}
							{...droppableProps}
							isDraggingOver={snapshot.isDraggingOver}>
							<Secondary primaryIndex={index} childs={childs} />
							{placeholder}
						</div>
					)}
				</Droppable>
			</Container>
		)}
	</Draggable>
);
export default Primary;
