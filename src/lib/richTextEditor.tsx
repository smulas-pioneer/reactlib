import * as React from 'react';
import {Button, ButtonGroup, Glyphicon, Jumbotron} from 'react-bootstrap';
import {
    Editor,
    EditorState,
    Entity,
    ContentState,
    CompositeDecorator
} from 'draft-js';

let AtomicBlockUtils = require('draft-js').AtomicBlockUtils;
let RichUtils = require("draft-js").RichUtils;
let stateFromHTML = require('draft-js-import-html').stateFromHTML;
let stateToHTML = require('draft-js-export-html').stateToHTML;

export {EditorState} from 'draft-js';

export interface RichTextEditorProps {
    editorState?: EditorState;
    onChange?:(editorState:EditorState) =>void;
    placeholder?:string;
}

// 
export interface RichTextEditorState {
    editorState?: EditorState,
    selectedBlock?,
    selectionRange?,
    editingImage?
}

export class RichTextEditor extends React.Component<RichTextEditorProps, RichTextEditorState>{

    public static editorStateFromHTML = (html:string) => {
        return EditorState.createWithContent(stateFromHTML(html||''));
    }

    public static htmlFromEditorState = (editorState:EditorState) =>{
        return stateToHTML(editorState.getCurrentContent());
    }

    constructor(props: RichTextEditorProps) {
        super(props);
        this.state = {
            editorState: props.editorState
        }
    }

    render() {

        return (
            <div className="editor" id="richEditor" onClick={() => { (this.refs["editor"] as any).focus() } }>
                <br/>
                <Jumbotron>
                    <Toolbar
                        editorState = {this.state.editorState}
                        onToggle = {this.toggleBlockType}
                        onToggleInlineStyle={this.toggleInlineStyle}
                        onUploadImage={this.handleUploadImage}
                    />
                    <Editor
                        blockRendererFn={this.blockRenderer}
                        blockStyleFn={this.blockStyler}
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        placeholder={this.props.placeholder||'write something..'}
                        spellCheck={true}
                        readOnly={this.state.editingImage}
                        ref="editor"
                        />
                </Jumbotron>
                <input type="file" ref="fileInput" style={{ display: 'none' }}
                    onChange={this.handleFileInput} />
            </div>
        )
    }

    private blockRenderer = (block) => {
        if (block.getType() === 'atomic') {
            return {
                component: ImageComponent
            };
        }
        return null;
    }

    private blockStyler = (block) => {
        if (block.getType() === 'unstyled') {
            return 'paragraph';
        }
        return null;
    }

    private handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    private onChange = (editorState) => {
        this.setState({ editorState },
            ()=>{
                this.updateSelection();
                if (this.props.onChange){
                    this.props.onChange(this.state.editorState);
                }  
          }
        );

    }

    private updateSelection = () => {
        const selectionRange = getSelectionRange();
        let selectedBlock;

        if (selectionRange) {
            selectedBlock = getSelectedBlockElement(selectionRange);
        }
        this.setState({
            selectedBlock: selectedBlock,
            selectionRange: selectionRange
        });
    }

    private insertImage = (file) => {
        const entityKey = Entity.create('atomic', 'IMMUTABLE', { src: URL.createObjectURL(file) });
        this.onChange(AtomicBlockUtils.insertAtomicBlock(
            this.state.editorState,
            entityKey,
            ' '
        ));
    }

    private handleFileInput = (e) => {
        const fileList = e.target.files;
        const file = fileList[0];
        this.insertImage(file);
    }

    private handleUploadImage = () => {
        this.refs["fileInput"]["click"]();
    }

    private toggleBlockType = (blockType) => {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    private toggleInlineStyle = (inlineStyle) => {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }
}

const ImageComponent = ({ block }) => {
    const imgContent = Entity.get(block.getEntityAt(0))["data"].src;
    return <img src={imgContent} />;
};

const getSelectionRange = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    return selection.getRangeAt(0);
}

const getSelectedBlockElement = (range) => {
    let node = range.startContainer;
    do {
        const nodeIsDataBlock = node.getAttribute
            ? node.getAttribute('data-block')
            : null;
        if (nodeIsDataBlock) return node;
        node = node.parentNode;
    } while (node !== null);
    return null;
}

const getSelectionCoords = (selectionRange) => {
    const editorBounds = document.getElementById('richEditor').getBoundingClientRect();
    const rangeBounds = selectionRange.getBoundingClientRect();
    const rangeWidth = rangeBounds.right - rangeBounds.left;
    const rangeHeight = rangeBounds.bottom - rangeBounds.top;
    const offsetLeft = (rangeBounds.left - editorBounds.left)
        + (rangeWidth / 2)
        /* 72px is width of inline toolbar */
        - (72 / 2);
    // 42px is height of inline toolbar (35px) + 5px center triangle and 2px for spacing
    const offsetTop = rangeBounds.top - editorBounds.top - 42;
    return { offsetLeft, offsetTop };
}





interface ToolbarProps {
    editorState;
    onUploadImage;
    onToggleInlineStyle;
    onToggle;
}

const Toolbar = (props: ToolbarProps) => {
    const selection = props.editorState.getSelection();
    const blockType = props.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    const style = props.editorState.getCurrentInlineStyle();
    return (
        <div>
            <ButtonGroup>
                <Button bsSize='sm' bsStyle={style.has('BOLD') ? 'primary' : 'default'} onMouseDown= {(e) => { e.preventDefault(); props.onToggleInlineStyle('BOLD') } }>Bold</Button>
                <Button bsSize='sm' bsStyle={style.has('ITALIC') ? 'primary' : 'default'} onMouseDown= {(e) => { e.preventDefault(); props.onToggleInlineStyle('ITALIC') } }>Italic</Button>
            </ButtonGroup>
            {' '}
            <ButtonGroup>
                <Button bsSize='sm' bsStyle={blockType == 'header-one' ? 'primary' : 'default'} onMouseDown= {(e) => { e.preventDefault(); props.onToggle('header-one') } }>Title</Button>
                <Button bsSize='sm' bsStyle={blockType == 'header-two' ? 'primary' : 'default'} onMouseDown= {(e) => { e.preventDefault(); props.onToggle('header-two') } }>Subtitle</Button>
                <Button bsSize='sm' bsStyle={blockType == 'blockquote' ? 'primary' : 'default'} onMouseDown= {(e) => { e.preventDefault(); props.onToggle('blockquote') } }>Quote</Button>
            </ButtonGroup>
            {' '}
            <ButtonGroup>
                <Button bsSize='sm' onMouseDown= {(e) => { e.preventDefault(); props.onUploadImage() } } >Image</Button>
            </ButtonGroup>
            {' '}
            <ButtonGroup>
                <Button bsSize='sm' bsStyle={blockType == 'unordered-list-item' ? 'primary' : 'default'} onMouseDown= {(e) => { e.preventDefault(); props.onToggle('unordered-list-item') } }>Unordered List</Button>
                <Button bsSize='sm' bsStyle={blockType == 'ordered-list-item' ? 'primary' : 'default'} onMouseDown= {(e) => { e.preventDefault(); props.onToggle('ordered-list-item') } }>Ordered List</Button>
            </ButtonGroup>

        </div>
    )
}