import React from 'react';
import connect from '../libs/connect';

import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';

import LaneHeader from './LaneHeader';
import Notes from './Notes';


const Lane = ({lane, notes, LaneActions, NoteActions, ...props}) => {
    const editNote = (id, task) => {
        NoteActions.update({id, task, editing: false});
    };
    const deleteNote = (noteId, e) => {
        e.stopPropagation();

        LaneActions.detachFromLane({
            laneId: lane.id,
            noteId
        });
        NoteActions.delete(noteId);
    };
    const activateNoteEdit = id => {
        NoteActions.update({id, editing: true});
    };

    return (
        <div {...props}>
            <LaneHeader lane={lane} />
            <Notes notes={selectNotesByIds(notes, lane.notes)}
                   onNoteClick={activateNoteEdit}
                   onEdit={editNote}
                   onDelete={deleteNote} />
        </div>
    );
};

function selectNotesByIds(allNotes, noteIds = []) {
    // `reduce` is a powerful method that allows us to
    // fold data. You can implement `filter` and `map`
    // through it. Here we are using it to concatenate
    // notes matching to the ids.
    return noteIds.reduce((notes, id) =>
        // Concatenate possible matching ids to the result
        notes.concat(
            allNotes.filter(note => note.id === id)
        )
        , []);
}


export default connect(
    ({notes}) => ({
        notes
    }), {
        LaneActions,
        NoteActions
    }
)(Lane)
