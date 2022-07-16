import { number, object } from 'prop-types';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BurgerMenu from '../burger-menu.svg';
const Container = styled.div`
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	user-select: none;
	width: 100%;
	& .tertiary-title {
		background: white;
		border-radius: 8px;
		border: 1px solid ${p => (p.isDragging ? 'transparent' : 'lightgrey')};
		box-shadow: ${p =>
			p.isDragging ? '12px 12px 15px #ebebeb, -12px -12px 15px #ffffff' : '0'};
		display: flex;
		font-size: 14px;
		font-weight: 700;
		margin: 10px 0 0 20px;
		padding: 8px;
		width: calc(100% - 36px);
		& img {
			height: 24px;
			margin: 0 10px 0 0;
			width: 24px;
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
			{({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
				<div
					{...draggableProps}
					className='tertiary-title'
					data-dragging={isDragging ? 'dragging' : ''}
					key={index}
					ref={innerRef}>
					<img {...dragHandleProps} src={BurgerMenu} />
					<div className='tertiary-name'>{child?.name}</div>
				</div>
			)}
		</Draggable>
	</Container>
);
Tertiary.propTypes = {
	child: object,
	index: number.isRequired,
	primaryIndex: number.isRequired,
	secondaryIndex: number.isRequired,
};
export default Tertiary;
