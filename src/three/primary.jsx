import { array, number, string } from 'prop-types';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BurgerMenu from '../burger-menu.svg';
import Secondary from './secondary.jsx';
const Container = styled.div`
	background: white;
	border-radius: 8px;
	border: 1px solid transparent;
	box-shadow: 0;
	display: flex;
	flex-direction: column;
	margin: 0 0 10px 0;
	padding: 10px;
	width: 100%;
	&[data-dragging='dragging'] {
		border: 1px solid lightgrey;
		box-shadow: 12px 12px 15px #ebebeb, -12px -12px 15px #ffffff;
	}
	& .primary-title {
		border-radius: 8px;
		border: 1px solid lightgrey;
		display: flex;
		font-size: 16px;
		font-weight: 700;
		padding: 8px;
		width: calc(100% - 18px);
		& img {
			height: 24px;
			margin-right: 10px;
			width: 24px;
		}
		& .primary-name {
			margin: 3px 0 0 0;
		}
	}
`;
const Primary = ({ index, name, childs }) => (
	<Draggable draggableId={`primaryDraggableId${index}`} index={index}>
		{({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
			<Container
				{...draggableProps}
				data-dragging={isDragging ? 'dragging' : ''}
				ref={innerRef}>
				<div className='primary-title'>
					<img {...dragHandleProps} src={BurgerMenu} />
					<div className='primary-name'>{name}</div>
				</div>
				<Droppable
					type='secondary'
					direction='vertical'
					droppableId={`${index}-droppableSecondaryId`}>
					{({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
						<div
							{...droppableProps}
							data-dragging-over={isDraggingOver ? 'dragging-over' : ''}
							ref={innerRef}>
							<Secondary primaryIndex={index} childs={childs} />
							{placeholder}
						</div>
					)}
				</Droppable>
			</Container>
		)}
	</Draggable>
);
Primary.propTypes = {
	childs: array,
	index: number.isRequired,
	name: string,
};
export default Primary;
