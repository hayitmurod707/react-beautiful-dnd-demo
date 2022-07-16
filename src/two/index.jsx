import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Section from './section';
const Container = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	& .view-sections-button {
		border-radius: 8px;
		border: none;
		padding: 0 15px;
		background: skyblue;
		font-size: 16px;
		font-weight: 500;
		margin: 0 0 20px 0;
		height: 44px;
	}
	& .list {
		background: white;
		border-radius: 5px;
		padding: 8px;
		transition: 400ms;
		width: 350px;
		&[data-dragging-over='dragging-over'] {
			background: skyblue;
		}
	}
`;
const Two = () => {
	const [sections, setSections] = useState([
		{
			order: 1,
			name: 'section-1',
			childs: [
				{
					order: 1,
					name: 'lesson-1-1',
				},
				{
					order: 2,
					name: 'lesson-1-2',
				},
			],
		},
		{
			order: 2,
			name: 'section-2',
			childs: [
				{
					order: 1,
					name: 'lesson-2-1',
				},
				{
					order: 2,
					name: 'lesson-2-2',
				},
				{
					order: 3,
					name: 'lesson-2-3',
				},
			],
		},
		{
			order: 3,
			name: 'section-3',
			childs: [
				{
					order: 1,
					name: 'lesson-3-1',
				},
				{
					order: 2,
					name: 'lesson-3-2',
				},
				{
					order: 3,
					name: 'lesson-3-4',
				},
			],
		},
		{
			order: 4,
			name: 'section-4',
			childs: [
				{
					order: 1,
					name: 'lesson-4-1',
				},
			],
		},
		{
			order: 5,
			name: 'section-5',
			childs: [
				{
					order: 1,
					name: 'lesson-5-1',
				},
				{
					order: 2,
					name: 'lesson-5-2',
				},
			],
		},
	]);
	const onDragEnd = ({ destination, source, type }) => {
		const { index: startIndex, droppableId: sourceId } = source;
		if (
			!destination ||
			(destination?.index === startIndex &&
				destination?.droppableId === sourceId)
		) {
			return;
		} else {
			const { index: endIndex, droppableId: destinationId } = destination;
			let list;
			if (type === 'sections') {
				const currentSection = sections[startIndex];
				list =
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
			} else {
				const nextSection = sections[parseInt(destinationId)]?.childs;
				const previousSection = sections[parseInt(sourceId)]?.childs;
				const currentLesson = previousSection[startIndex];
				const previousLessons = previousSection?.filter(
					(section, index) => index !== startIndex,
				);
				const lessons1 = nextSection?.slice(0, endIndex);
				const lessons2 = nextSection?.slice(endIndex);
				const nextLessons =
					destinationId === sourceId
						? startIndex > endIndex
							? [
									...lessons1,
									currentLesson,
									...nextSection?.slice(endIndex, startIndex),
									...nextSection?.slice(startIndex + 1),
							  ]
							: [
									...nextSection?.slice(0, startIndex),
									...nextSection?.slice(startIndex + 1, endIndex + 1),
									currentLesson,
									...nextSection?.slice(endIndex + 1),
							  ]
						: [...lessons1, currentLesson, ...lessons2];
				list = sections?.map((section, index) => {
					if (index === parseInt(destinationId)) {
						return { ...section, childs: nextLessons };
					} else if (index === parseInt(sourceId)) {
						return { ...section, childs: previousLessons };
					} else {
						return section;
					}
				});
			}
			setSections(list);
		}
	};
	const parseOrder = () => {
		const section = sections?.map((section, index) => {
			const order = index + 1;
			const childs = section?.childs?.map((child, index) => {
				const order = index + 1;
				return { ...child, order: order };
			});
			const newItem = { ...section, order, childs };
			return newItem;
		});
		console.log(section);
	};
	return (
		<Container>
			<button className='view-sections-button' onClick={parseOrder}>
				View sections
			</button>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					direction='vertical'
					type='sections'
					droppableId='all-columns'>
					{({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
						<div
							{...droppableProps}
							className='list'
							data-dragging-over={isDraggingOver ? 'dragging-over' : ''}
							ref={innerRef}>
							{sections?.map((section, index) => (
								<Section {...section} index={index} key={index} />
							))}
							{placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</Container>
	);
};
export default Two;
