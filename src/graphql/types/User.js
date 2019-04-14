import MongooseModels from "../../mongooseModels";


const User = MongooseModels('User');

export default {
  contacts: async(paerent ,args, {session, userLoader}) => {
    try {
      let user = await userLoader.load(paerent.id.toString());
      let users = await userLoader.loadMany( user.contacts.map( c => c._id.toString() ))

      let startCursor = '';
      let endCursor = '';
      let edges = users.map(contact => {
        startCursor = startCursor || `${contact.id}`;
        endCursor = `${contact.id}`;
        return {
          cursor: `${contact.id}`,
          node: contact
        }
      });
      return {
        edges: edges,
        totalCount: edges.length,
        pageInfo: {
          startCursor: startCursor,
          endCursor: endCursor,
          hasNextPage: false
        }
      }
    } catch (error) {
      return new Error(error)
    }
  },
  groups: async(paerent ,args, {session, userLoader, groupLoader}) => {
    try {
      let user = await userLoader.load(paerent.id.toString());
      let groups = await groupLoader.loadMany( user.groups.map( g => g._id.toString() ))

      let startCursor = '';
      let endCursor = '';
      let edges = groups.map(group => {
        startCursor = startCursor || `${group.id}`;
        endCursor = `${endCursor.id}`;
        return {
          cursor: `${group.id}`,
          node: group
        }
      });
      return {
        edges: edges,
        totalCount: edges.length,
        pageInfo: {
          startCursor: startCursor,
          endCursor: endCursor,
          hasNextPage: false
        }
      }
    } catch (error) {
      return new Error(error)
    }
  }
}