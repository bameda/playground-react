import storage from '../../libs/storage';
import persist from '../../libs/persist';

import LaneStore from '../../stores/LaneStore';
import NoteStore from '../../stores/NoteStore';



export default alt => {
    alt.addStore('LaneStore', LaneStore);
    alt.addStore('NoteStore', NoteStore);

    persist(alt, storage(localStorage), 'app');
}
