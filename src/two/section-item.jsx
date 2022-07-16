import { array, number } from 'prop-types';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BurgerMenu from '../burger-menu.svg';
const Container = styled.div`
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	user-select: none;
	& .section-child-title {
		align-items: center;
		background: white;
		border-radius: 8px;
		border: 1px solid lightgrey;
		display: flex;
		font-size: 14px;
		font-weight: 700;
		margin: 8px 0 8px 26px;
		padding: 8px 16px;
		width: calc(100% - 60px);
		&[data-dragging='dragging'] {
			background: lightgreen;
		}
		& img {
			height: 24px;
			margin-right: 10px;
			width: 24px;
		}
		& .section-child-name {
			display: inline-block;
		}
	}
	& .child-dragging {
		background: lightgreen;
	}
`;
const SectionItem = ({ childs, index: columnIndex }) => (
	<Container>
		{childs?.map(({ name }, index) => (
			<Draggable
				draggableId={`${columnIndex}-${index}`}
				index={index}
				key={index}>
				{({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
					<div
						{...draggableProps}
						className='section-child-title'
						data-dragging={isDragging ? 'dragging' : ''}
						id={`${columnIndex}-${index}`}
						key={index}
						ref={innerRef}>
						<img {...dragHandleProps} src={BurgerMenu} />
						<div className='section-child-name'>{name}</div>
					</div>
				)}
			</Draggable>
		))}
	</Container>
);
SectionItem.propTypes = {
	childs: array,
	index: number.isRequired,
};
export default SectionItem;
