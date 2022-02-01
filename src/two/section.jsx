import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BurgerMenu from '../burger-menu.svg';
import SectionItem from './section-item';

const Container = styled.div`
	user-select: none;
	display: flex;
	flex-direction: column;
	margin: 0 0 8px 0;
	border-radius: 8px;
	padding: 8px;
	background: white;
	border: 1px solid;
	border-color: lightgrey;
	&[data-dragging='true'] {
		background: lightgreen;
	}
	& .section-title {
		height: 28px;
		width: calc(100% - 18px);
		display: flex;
		padding: 8px;
		align-items: center;
		border-radius: 8px;
		margin: 0 0 8px 0;
		font-weight: 700;
		font-size: 16px;
		border: 1px solid lightgrey;
		& img {
			width: 24px;
			height: 24px;
			margin-right: 10px;
		}
		& .section-name {
			display: inline-block;
		}
	}
	& .section-child-container {
		background: transparent;
		border-radius: 8px;
		transition: 400ms;
	}
	& .dragging-over {
		background: skyblue;
	}
`;

const Section = ({ index, name, childs }) => (
	<Draggable draggableId={`column-${index}`} index={index}>
		{({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
			<Container
				ref={innerRef}
				data-dragging={snapshot.isDragging}
				{...draggableProps}>
				<div className="section-title" isDragging={snapshot.isDragging}>
					<img {...dragHandleProps} src={BurgerMenu} />
					<div className="section-name">{name}</div>
				</div>
				<Droppable
					type="lessons"
					direction="vertical"
					droppableId={`${index}-column`}>
					{({ innerRef, droppableProps, placeholder }, snapshot) => (
						<div
							className={
								snapshot.isDraggingOver
									? 'section-child-container dragging-over'
									: 'section-child-container'
							}
							ref={innerRef}
							{...droppableProps}>
							<SectionItem index={index} childs={childs} />
							{placeholder}
						</div>
					)}
				</Droppable>
			</Container>
		)}
	</Draggable>
);
export default Section;
