(function(){
	'use strict';

	angular.module('biblio')
		.service('referenceService', ['$q', ReferenceService]);

	function ReferenceService($q){
		var references = [
			{
				author: [
					{firstname: 'L.', lastname: 'Devillers', email: ''},
					{firstname: 'I.', lastname: 'Vasilescu', email: ''}
				],
				date: 'May 2004',
				journal: 'LREC',
				title: 'Reliability of Lexical and Prosodic cues in two real-life spoken dialog corpora',
				categories: [
					{
						name: 'Psychologie',
						color: 'red'
					},
					{
						name: 'Informatique',
						color: 'green'
					}
				],
				type: 'Article',
				added_at: 'description ref1'
			},
			{
				author: [
					{firstname: 'A.', lastname: 'Batliner', email: ''},
					{firstname: 'K.', lastname: 'Fischer', email: ''},
					{firstname: 'R.', lastname: 'Huber', email: ''},
					{firstname: 'J.', lastname: 'Spilker', email: ''},
					{firstname: 'E.', lastname: 'Noth', email: ''}
				],
				date: '2000',
				journal: 'Proceedings ofr ITRW on Speech and Emotion',
				title: 'Desperately Seeking Emotion or: Actors, Wizards and Human Beings, Newcastle, Northern Ireland, UK, 2000.',
				categories: [
					{
						name: 'Sociologie',
						color: 'blue'
					}
				],
				type: 'Thesis',
				added_at: 'description ref2'
			},
			{
				author: [
					{firstname: 'R. W.', lastname: 'Picard', email: ''},
					{firstname: 'E.', lastname: 'Vyzas', email: ''},
					{firstname: 'J.', lastname: 'Healey', email: ''}
				],
				date: '2001',
				journal: 'IEEE Transactions on Patterns Analysis and Machine Intelligence',
				title: "Toward Machine Emotional Intelligence: Analysis of Affective Physiological State",
				categories: [
					{
						name: 'Psychologie',
						color: 'red'
					}
				],
				type: 'Article',
				added_at: 'description ref1'
			},
			{
				author: [
					{firstname: 'Randolph R.', lastname: 'CORNELIUS', email: ''},
				],
				date: '1996',
				editor: 'Prentice-Hall, In. Upper Saddle River, NJ 07458',
				bookTitle: 'The Science Of Emotion',
				title: 'Feeling is Thinking: The cognitive Perspective',
				categories: [
					{
						name: 'Psychologie',
						color: 'red'
					}
				],
				type: 'Chapter',
				added_at: 'description ref1'
			},
			{
				author: [
					{firstname: 'Randolph R.', lastname: 'CORNELIUS', email: ''},
				],
				date: '1996',
				editor: 'Prentice-Hall, Inc. Upper Saddle River, NJ 07458.',
				title: 'The Science Of Emotion',
				categories: [
					{
						name: 'Psychologie',
						color: 'red'
					}
				],
				type: 'Book',
				added_at: 'description ref1'
			},
			{
				author: [],
				date: '',
				editor: '',
				bookTitle: '',
				title: 'L. Devillers, I. Vasilescu: “Reliability of Lexical and Prosodic cues in two real-life spoken dialog corpora”, LREC, Lisbonne, May 2004.',
				categories: [],
				type: 'Chapter',
				added_at: 'description ref1'
			},
			{
				author: [],
				date: '',
				journal: '',
				title: 'L. Devillers, I. Vasilescu: “Reliability of Lexical and Prosodic cues in two real-life spoken dialog corpora”, LREC, Lisbonne, May 2004.',
				categories: [],
				type: 'Thesis',
				added_at: 'description ref1'
			},
		];

		// Promise-based API
		return {
			loadAllReferences : function() {
				// Simulate async nature of real remote calls
				return $q.when(references);
			}
		};
	}
})();
