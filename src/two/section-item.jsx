import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BurgerMenu from '../burger-menu.svg';

const Container = styled.div`
	user-select: none;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	& .section-child-title {
		width: calc(100% - 60px);
		display: flex;
		padding: 8px 16px;
		margin: 8px 0 8px 26px;
		font-weight: 700;
		font-size: 14px;
		align-items: center;
		border-radius: 8px;
		border: 1px solid lightgrey;
		background: white;
		& img {
			width: 24px;
			height: 24px;
			margin-right: 10px;
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
		{childs.map((child, index) => {
			return (
				<Draggable
					key={index}
					draggableId={`${columnIndex}-${index}`}
					index={index}>
					{({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
						<div
							className={
								snapshot.isDragging
									? 'section-child-title child-dragging'
									: 'section-child-title'
							}
							id={`${columnIndex}-${index}`}
							ref={innerRef}
							isDragging={snapshot.isDragging}
							{...draggableProps}
							key={index}>
							<img src={BurgerMenu} {...dragHandleProps} />
							<div className="section-child-name">{child.name}</div>
						</div>
					)}
				</Draggable>
			);
		})}
	</Container>
);
export default SectionItem;
