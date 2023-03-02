import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);
  const get = jateDb.transaction("jate", "readwrite")
  const storeDb = get.objectStore('jate')
  const request = storeDb.put({id: 1, value: content})
  const result = await request;
  console.log(result)
  
  // console.error('putDb not implemented');
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const get = jateDb.transaction("jate", "readonly")
  const storeDb = get.objectStore('jate')
  const request = storeDb.getAll()
  const result = await request;
  return result; 
 

}

initdb();
