
function getIterator(){
	var scope = document.body,
		show = NodeFilter.SHOW_TEXT,
		filter = isValidTextNode,
		nodeIterator = document.createNodeIterator(scope, show, filter, false);

	//TODO: Skip if only currency symbol or number, skip if its a style element
	function isValidTextNode(node) {
	  if (node.parentNode.nodeName.toLowerCase() === 'script' || !/\S/.test(node.data)) {
		return NodeFilter.FILTER_SKIP;
	  } else {
		return NodeFilter.FILTER_ACCEPT;
	  }
	}
	
	return nodeIterator;
};

function alterTextNodes(nodeIterator){
	while(currNode = nodeIterator.nextNode()){
	  currNode.nodeValue = '[' + currNode.nodeValue + ']';
	}
}

alterTextNodes(getIterator());

