import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Primary from './primary';
const Container = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	& .list {
		background: white;
		border-radius: 5px;
		width: 600px;
		&[data-dragging-over='dragging-over'] {
			background: skyblue;
		}
	}
`;
const Three = () => {
	const [sections, setSections] = useState([
		{
			order: 1,
			name: 'primary-1',
			childs: [
				{
					order: 1,
					name: 'secondary-1-1',
					childs: [
						{
							order: 1,
							name: 'tertiary-1-1-1',
						},
						{
							order: 2,
							name: 'tertiary-1-1-2',
						},
						{
							order: 3,
							name: 'tertiary-1-1-3',
						},
						{
							order: 4,
							name: 'tertiary-1-1-4',
						},
						{
							order: 5,
							name: 'tertiary-1-1-5',
						},
					],
				},
				{
					order: 2,
					name: 'secondary-1-2',
					childs: [
						{
							order: 1,
							name: 'tertiary-1-2-1',
						},
						{
							order: 2,
							name: 'tertiary-1-2-2',
						},
					],
				},
			],
		},
		{
			order: 2,
			name: 'primary-2',
			childs: [
				{
					order: 1,
					name: 'secondary-2-1',
					childs: [
						{
							order: 1,
							name: 'tertiary-2-1-1',
						},
						{
							order: 2,
							name: 'tertiary-2-1-2',
						},
					],
				},
				{
					order: 2,
					name: 'secondary-2-2',
					childs: [
						{
							order: 1,
							name: 'tertiary-2-2-1',
						},
						{
							order: 2,
							name: 'tertiary-2-2-2',
						},
					],
				},
				{
					order: 3,
					name: 'secondary-2-3',
					childs: [
						{
							order: 1,
							name: 'tertiary-2-3-1',
						},
						{
							order: 2,
							name: 'tertiary-2-3-2',
						},
					],
				},
			],
		},
		{
			order: 3,
			name: 'primary-3',
			childs: [
				{
					order: 1,
					name: 'secondary-3-1',
					childs: [
						{
							order: 1,
							name: 'tertiary-3-1-1',
						},
						{
							order: 2,
							name: 'tertiary-3-1-2',
						},
					],
				},
				{
					order: 2,
					name: 'secondary-3-2',
					childs: [
						{
							order: 1,
							name: 'tertiary-3-2-1',
						},
						{
							order: 2,
							name: 'tertiary-3-2-2',
						},
					],
				},
				{
					order: 3,
					name: 'secondary-3-4',
					childs: [
						{
							order: 1,
							name: 'tertiary-3-4-1',
						},
						{
							order: 2,
							name: 'tertiary-3-4-2',
						},
					],
				},
			],
		},
		{
			order: 4,
			name: 'primary-4',
			childs: [
				{
					order: 1,
					name: 'secondary-4-1',
					childs: [
						{
							order: 1,
							name: 'tertiary-4-1-1',
						},
						{
							order: 2,
							name: 'tertiary-4-1-2',
						},
					],
				},
			],
		},
		{
			order: 5,
			name: 'primary-5',
			childs: [
				{
					order: 1,
					name: 'secondary-5-1',
					childs: [
						{
							order: 1,
							name: 'tertiary-5-1-1',
						},
						{
							order: 2,
							name: 'tertiary-5-1-2',
						},
					],
				},
				{
					order: 2,
					name: 'secondary-5-2',
					childs: [
						{
							order: 1,
							name: 'tertiary-5-2-1',
						},
						{
							order: 2,
							name: 'tertiary-5-2-2',
						},
					],
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
			let list = sections;
			if (type === 'primary') {
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
			} else if (type === 'secondary') {
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
					const newSection =
						index === parseInt(destinationId)
							? { ...section, childs: nextLessons }
							: index === parseInt(sourceId)
							? { ...section, childs: previousLessons }
							: section;
					return newSection;
				});
			} else {
				const { index: endIndex, droppableId: destinationId } = destination;
				const sourceOrders = [...sourceId?.split('-')];
				const destinationOrders = [...destinationId?.split('-')];
				const primarySourceOrder = parseInt(sourceOrders[0]);
				const secondarySourceOrder = parseInt(sourceOrders[1]);
				const primaryDestinationOrder = parseInt(destinationOrders[0]);
				const secondaryDestinationOrder = parseInt(destinationOrders[1]);
				if (primarySourceOrder === primaryDestinationOrder) {
					if (secondarySourceOrder === secondaryDestinationOrder) {
						const currentPrimarySection = sections[primarySourceOrder];
						const currentSecondarySection =
							currentPrimarySection?.childs[secondarySourceOrder];
						const currentSecondaryChilds = currentSecondarySection?.childs;
						const currentSection = currentSecondaryChilds[startIndex];
						const newChilds =
							startIndex < endIndex
								? [
										...currentSecondaryChilds?.slice(0, startIndex),
										...currentSecondaryChilds?.slice(
											startIndex + 1,
											endIndex + 1,
										),
										currentSection,
										...currentSecondaryChilds?.slice(endIndex + 1),
								  ]
								: [
										...currentSecondaryChilds?.slice(0, endIndex),
										currentSection,
										...currentSecondaryChilds?.slice(endIndex, startIndex),
										...currentSecondaryChilds?.slice(startIndex + 1),
								  ];
						const newCurrentSecondarySection = {
							...currentSecondarySection,
							childs: newChilds,
						};
						const newSections = sections?.map((section, index) => {
							if (index === primaryDestinationOrder) {
								const childs = section?.childs?.map((child, index) => {
									if (index === secondarySourceOrder) {
										return newCurrentSecondarySection;
									} else {
										return child;
									}
								});
								return { ...section, childs };
							} else {
								return section;
							}
						});
						list = newSections;
					} else {
						const currentPrimarySection = sections[primarySourceOrder];
						const currentSecondarySection =
							currentPrimarySection?.childs[secondarySourceOrder];
						const currentSecondaryChilds = currentSecondarySection?.childs;
						const currentSection = currentSecondaryChilds[startIndex];
						const prevPrevSection = currentSecondaryChilds?.slice(
							0,
							startIndex,
						);
						const prevNextSection = currentSecondaryChilds?.slice(
							startIndex + 1,
						);
						const prevSection = {
							...currentSecondarySection,
							childs: [...prevPrevSection, ...prevNextSection],
						};
						const nextSecondarySection =
							currentPrimarySection?.childs[secondaryDestinationOrder];
						const nextSecondarySectionChilds = nextSecondarySection?.childs;
						const nextPrevSection = nextSecondarySectionChilds?.slice(
							0,
							endIndex,
						);
						const nextNextSection = nextSecondarySectionChilds?.slice(endIndex);
						const newNextSectionChilds = [
							...nextPrevSection,
							currentSection,
							...nextNextSection,
						];
						const nextSection = {
							...nextSecondarySection,
							childs: newNextSectionChilds,
						};
						const newSections = sections?.map((section, index) => {
							if (index === primarySourceOrder) {
								const childs = section?.childs?.map((child, index) => {
									if (index === secondarySourceOrder) {
										return prevSection;
									} else if (index === secondaryDestinationOrder) {
										return nextSection;
									} else {
										return child;
									}
								});
								return {
									...section,
									childs,
								};
							} else {
								return section;
							}
						});
						list = newSections;
					}
				} else {
					const currentPrimarySection = sections[primarySourceOrder];
					const currentSecondarySection =
						currentPrimarySection?.childs[secondarySourceOrder];
					const currentSecondaryChilds = currentSecondarySection?.childs;
					const currentSection = currentSecondaryChilds[startIndex];
					const prevSection = {
						...currentSecondarySection,
						childs: [
							...currentSecondaryChilds?.slice(0, startIndex),
							...currentSecondaryChilds?.slice(startIndex + 1),
						],
					};
					const nextPrimarySection = sections[primaryDestinationOrder];
					const nextSecondarySection =
						nextPrimarySection?.childs[secondaryDestinationOrder];
					const nextSecondaryChilds = nextSecondarySection?.childs;
					const newNextSecondarySection = {
						...nextSecondarySection,
						childs: [
							...nextSecondaryChilds?.slice(0, endIndex),
							currentSection,
							...nextSecondaryChilds?.slice(endIndex),
						],
					};
					const newNextPrimarySection = nextPrimarySection?.childs?.map(
						(section, index) => {
							if (index === secondaryDestinationOrder) {
								return newNextSecondarySection;
							} else {
								return section;
							}
						},
					);
					const newPrevPrimarySection = currentPrimarySection?.childs?.map(
						(section, index) => {
							if (index === secondarySourceOrder) {
								return prevSection;
							} else {
								return section;
							}
						},
					);
					const newSections = sections?.map((section, index) => {
						if (index === primarySourceOrder) {
							return { ...section, childs: newPrevPrimarySection };
						} else if (index === primaryDestinationOrder) {
							return { ...section, childs: newNextPrimarySection };
						} else {
							return section;
						}
					});
					list = newSections;
				}
			}
			setSections(list);
		}
	};
	const parseOrder = () => {
		const section = sections?.map((section, index) => {
			const childs = section?.childs?.map((child, index) => {
				const childs = child?.childs?.map((child, index) => {
					return { ...child, order: index + 1 };
				});
				return { ...child, order: index + 1, childs };
			});
			return { ...section, order: index + 1, childs };
		});
		console.log(section);
	};
	return (
		<Container>
			<button style={{ margin: '0 0 20px 0' }} onClick={parseOrder}>
				View sections
			</button>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					direction='vertical'
					type='primary'
					droppableId='droppablePrimaryId'>
					{({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
						<div
							{...droppableProps}
							className='list'
							data-dragging-over={isDraggingOver ? 'dragging-over' : ''}
							ref={innerRef}>
							{sections?.map((section, index) => (
								<Primary {...section} index={index} key={index} />
							))}
							{placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</Container>
	);
};
export default Three;
