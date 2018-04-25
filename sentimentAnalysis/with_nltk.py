
# short sentences described in the paper - "Sentence Similarity based
# on Semantic Nets and Corpus Statistics" by Li, et al.
# I've used python nltk wordnet and brown corpus

#from sentimentAnalysis.functions import *

#Testing the algorithm:
sentence1 = "I need the email of tuition department"
sentence2 = "do you have the phone number of the tuition department?"

print('Comparison for',sentence1,'and', sentence2, 'is', similarity(sentence1, sentence2))