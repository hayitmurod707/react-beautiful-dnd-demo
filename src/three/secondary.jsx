import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BurgerMenu from '../burger-menu.svg';
import Tertiary from './tertiary';

const Container = styled.div`
	user-select: none;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	& .secondary-title {
		display: flex;
		padding: 0 0 0 20px;
		font-weight: 700;
		font-size: 14px;
		align-items: center;
		border-radius: 8px;
		background: white;
		display: flex;
		flex-direction: column;
		& .secondary-name-container {
			box-shadow: ${p =>
				p.isDragging
					? '12px 12px 15px #ebebeb, -12px -12px 15px #ffffff'
					: '0'};
			border: 1px solid ${p => (p.isDragging ? 'transparent' : 'lightgrey')};
			width: calc(100% - 16px);
			margin: 10px 0 0 0;
			border-radius: 8px;
			padding: 8px;
			display: flex;
			& .secondary-handle {
				width: 24px;
				height: 24px;
				margin-right: 10px;
			}
			& .secondary-name {
				margin: 4px 0 0 0;
			}
		}
	}
`;

const Secondary = ({ childs, primaryIndex }) => (
	<Container>
		{childs.map((child, index) => (
			<Draggable
				key={index}
				draggableId={`secondaryDraggableId${primaryIndex}-${index}`}
				index={index}>
				{(provided, snapshot) => (
					<div
						className="secondary-title"
						ref={provided.innerRef}
						isDragging={snapshot.isDragging}
						{...provided.draggableProps}
						key={index}>
						<div className="secondary-name-container">
							<img
								className="secondary-handle"
								src={BurgerMenu}
								{...provided.dragHandleProps}
							/>
							<div className="secondary-name">{child.name}</div>
						</div>
						<Droppable
							type="tertiary"
							direction="vertical"
							droppableId={`${primaryIndex}-${index}-droppableTertiaryId`}>
							{({ innerRef, droppableProps, placeholder }, snapshot) => (
								<div
									style={{ width: '100%' }}
									ref={innerRef}
									{...droppableProps}>
									{child.childs.map((child, number) => (
										<Tertiary
											primaryIndex={primaryIndex}
											key={number}
											index={number}
											secondaryIndex={index}
											child={child}
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
export default Secondary;
