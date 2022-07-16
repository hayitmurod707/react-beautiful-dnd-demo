import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import BurgerMenu from '../burger-menu.svg';
import { Container } from './styled';
const One = () => {
	const [sections, setSections] = useState([
		{
			order: 1,
			name: 'section-1',
		},
		{
			order: 2,
			name: 'section-2',
		},
		{
			order: 3,
			name: 'section-3',
		},
		{
			order: 4,
			name: 'section-4',
		},
		{
			order: 5,
			name: 'section-5',
		},
		{
			order: 6,
			name: 'section-6',
		},
		{
			order: 7,
			name: 'section-7',
		},
		{
			order: 8,
			name: 'section-8',
		},
		{
			order: 9,
			name: 'section-9',
		},
		{
			order: 10,
			name: 'section-10',
		},
	]);
	const onDragEnd = ({ destination, source }) => {
		if (destination) {
			const { index: startIndex } = source;
			const { index: endIndex } = destination;
			const currentSection = sections[startIndex];
			const list =
				startIndex > endIndex
					? [
							...sections?.slice(0, endIndex),
							currentSection,
							...sections?.slice(endIndex, startIndex),
							...sections?.slice(startIndex + 1),
					  ]
					: [
							...sections?.slice(0, startIndex),
							...sections?.slice(startIndex + 1, endIndex + 1),
							currentSection,
							...sections?.slice(endIndex + 1),
					  ];
			setSections(list);
		} else {
			return;
		}
	};
	const parseOrder = () => {
		const newList = sections?.map((section, index) => {
			const order = index + 1;
			return { ...section, order: order };
		});
		console.log(newList);
	};
	return (
		<Container>
			<button className='view-sections-button' onClick={parseOrder}>
				View sections
			</button>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable direction='vertical' droppableId='droppable'>
					{({ innerRef, placeholder, droppableProps }, { isDraggingOver }) => (
						<div
							className='list'
							data-dragging-over={isDraggingOver ? 'dragging-over' : ''}
							ref={innerRef}>
							{sections?.map(({ name }, index) => (
								<Draggable key={index} draggableId={`${index}`} index={index}>
									{(
										{ innerRef, draggableProps, dragHandleProps },
										{ isDragging },
									) => (
										<div
											{...draggableProps}
											className='list-item'
											data-dragging={isDragging ? 'dragging' : ''}
											ref={innerRef}>
											<img {...dragHandleProps} src={BurgerMenu} />
											<div className='item-name'>{name}</div>
										</div>
									)}
								</Draggable>
							))}
							{placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</Container>
	);
};
export default One;
