import { array, number, string } from 'prop-types';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BurgerMenu from '../burger-menu.svg';
import SectionItem from './section-item';
const Container = styled.div`
	background: white;
	border-radius: 8px;
	border: 1px solid;
	border-color: lightgrey;
	display: flex;
	flex-direction: column;
	margin: 0 0 8px 0;
	padding: 8px;
	user-select: none;
	&[data-dragging='dragging'] {
		background: lightgreen;
	}
	& .section-title {
		align-items: center;
		border-radius: 8px;
		border: 1px solid lightgrey;
		display: flex;
		font-size: 16px;
		font-weight: 700;
		height: 28px;
		margin: 0 0 8px 0;
		padding: 8px;
		width: calc(100% - 18px);
		& img {
			height: 24px;
			margin-right: 10px;
			width: 24px;
		}
		& .section-name {
			display: inline-block;
		}
	}
	& .section-child-container {
		background: transparent;
		border-radius: 8px;
		transition: 400ms;
		&[data-dragging-over='dragging-over'] {
			background: skyblue;
		}
	}
`;
const Section = ({ index, name, childs }) => (
	<Draggable draggableId={`column-${index}`} index={index}>
		{({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
			<Container
				{...draggableProps}
				data-dragging={isDragging ? 'dragging' : ''}
				ref={innerRef}>
				<div className='section-title'>
					<img {...dragHandleProps} src={BurgerMenu} />
					<div className='section-name'>{name}</div>
				</div>
				<Droppable
					type='lessons'
					direction='vertical'
					droppableId={`${index}-column`}>
					{({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
						<div
							{...droppableProps}
							className='section-child-container'
							data-dragging-over={isDraggingOver ? 'dragging-over' : ''}
							ref={innerRef}>
							<SectionItem index={index} childs={childs} />
							{placeholder}
						</div>
					)}
				</Droppable>
			</Container>
		)}
	</Draggable>
);
Section.propTypes = {
	childs: array,
	index: number.isRequired,
	name: string,
};
export default Section;
