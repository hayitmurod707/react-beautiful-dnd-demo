import { array, number } from 'prop-types';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BurgerMenu from '../burger-menu.svg';
import Tertiary from './tertiary';
const Container = styled.div`
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	user-select: none;
	& .secondary-title {
		align-items: center;
		background: white;
		border-radius: 8px;
		display: flex;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		font-weight: 700;
		padding: 0 0 0 20px;
		& .secondary-name-container {
			border-radius: 8px;
			display: flex;
			margin: 10px 0 0 0;
			padding: 8px;
			width: calc(100% - 16px);
			box-shadow: ${p =>
				p.isDragging
					? '12px 12px 15px #ebebeb, -12px -12px 15px #ffffff'
					: '0'};
			border: 1px solid ${p => (p.isDragging ? 'transparent' : 'lightgrey')};
			& .secondary-handle {
				height: 24px;
				margin-right: 10px;
				width: 24px;
			}
			& .secondary-name {
				margin: 4px 0 0 0;
			}
		}
	}
`;
const Secondary = ({ childs, primaryIndex }) => (
	<Container>
		{childs?.map((child, index) => (
			<Draggable
				draggableId={`secondaryDraggableId${primaryIndex}-${index}`}
				index={index}
				key={index}>
				{({ draggableProps, innerRef, dragHandleProps }, { isDragging }) => (
					<div
						{...draggableProps}
						className='secondary-title'
						data-dragging={isDragging ? 'dragging' : ''}
						key={index}
						ref={innerRef}>
						<div className='secondary-name-container'>
							<img
								{...dragHandleProps}
								className='secondary-handle'
								src={BurgerMenu}
							/>
							<div className='secondary-name'>{child?.name}</div>
						</div>
						<Droppable
							type='tertiary'
							direction='vertical'
							droppableId={`${primaryIndex}-${index}-droppableTertiaryId`}>
							{({ innerRef, droppableProps, placeholder }, snapshot) => (
								<div
									{...droppableProps}
									ref={innerRef}
									style={{ width: '100%' }}>
									{child?.childs?.map((child, number) => (
										<Tertiary
											child={child}
											index={number}
											key={number}
											primaryIndex={primaryIndex}
											secondaryIndex={index}
										/>
									))}
									{placeholder}
								</div>
							)}
						</Droppable>
					</div>
				)}
			</Draggable>
		))}
	</Container>
);
Secondary.propTypes = {
	childs: array,
	primaryIndex: number.isRequired,
};
export default Secondary;
