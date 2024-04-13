const Sequence = require('../models/sequence');

const SequenceGenerator = function() {
  let sequenceId = null;
  let maxDocumentId = null;
  let maxMessageId = null;
  let maxContactId = null;

  const initialize = async function() {
    try {
      const sequence = await Sequence.findOne().exec();
      if (!sequence) {
        throw new Error('Sequence not found');
      }

      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;

      console.log('Initialized sequence:', { sequenceId, maxDocumentId, maxMessageId, maxContactId });
      // return;s


      // sequenceId = sequence._id;
      // maxDocumentId = sequence.maxDocumentId;
      // maxMessageId = sequence.maxMessageId;
      // maxContactId = sequence.maxContactId;
    } catch (error) {
      throw new Error('An error occurred while initializing SequenceGenerator: ' + error.message);
    }
  };

  const nextId = async function(collectionType) {
    try {
      if (!sequenceId) {
        throw new Error('Sequence not initialized');
      }

      let nextId;
      let updateObject = {};

      switch (collectionType) {
        case 'documents':
          maxDocumentId++;
          updateObject = { maxDocumentId: maxDocumentId };
          nextId = maxDocumentId;
          break;
        case 'messages':
          maxMessageId++;
          updateObject = { maxMessageId: maxMessageId };
          nextId = maxMessageId;
          break;
        case 'contacts':
          maxContactId++;
          updateObject = { maxContactId: maxContactId };
          nextId = maxContactId;
          break;
        default:
          throw new Error('Invalid collectionType');
      }

      await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });

      return nextId;
    } catch (error) {
      throw new Error('An error occurred in nextId: ' + error.message);
    }
  };

  // Ensure initialization is called upon creation
  initialize().catch(error => {
    console.error('Error initializing SequenceGenerator:', error);
  });

  return {
    initialize,
    nextId
  };
};

module.exports = SequenceGenerator();
