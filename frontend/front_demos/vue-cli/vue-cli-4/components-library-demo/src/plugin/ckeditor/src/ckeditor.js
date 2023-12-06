/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage.js';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import HtmlComment from '@ckeditor/ckeditor5-html-support/src/htmlcomment.js';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import LineHeight from 'ckeditor5-line-height-plugin/src/lineheight';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat.js';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter.js';
import Style from '@ckeditor/ckeditor5-style/src/style.js';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize.js';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';


class Editor extends ClassicEditor { }

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	Autoformat,
	AutoImage,
	AutoLink,
	BlockQuote,
	Bold,
	CloudServices,
	Essentials,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	GeneralHtmlSupport,
	Heading,
	HtmlComment,
	HtmlEmbed,
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	LineHeight,
	Link,
	LinkImage,
	List,
	ListProperties,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	RemoveFormat,
	SimpleUploadAdapter,
	Style,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextTransformation,
	Underline,
	PageBreak,
	HorizontalLine,
	SpecialCharacters,
	SpecialCharactersEssentials
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'link',
			'underline',
			'bulletedList',
			'numberedList',
			'|',
			'lineHeight',
			'outdent',
			'indent',
			'alignment',
			'|',
			'insertTable',
			'-',
			'imageUpload',
			'imageInsert',
			'|',
			'pageBreak',
			'horizontalLine',
			'|',
			'specialCharacters',
			'htmlEmbed',
			'blockQuote',
			'style',
			'undo',
			'redo',
			'removeFormat'
		],
		shouldNotGroupWhenFull: true
	},
	language: 'zh-cn',
	lineHeight: { // specify your otions in the lineHeight config object. Default values are [ 0, 0.5, 1, 1.5, 2 ]
		options: [ 1, 1.25, 1.5, 2, 2.5 ]
	},
	image: {
		toolbar: [
			'imageTextAlternative',
			'toggleImageCaption',
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'linkImage'
		]
	},
	fontSize: {
		// 12 14 16 18 20 22 24 26 28 30 32 36 48 72
		options: [
			12,
			13,
			14,
			15,
			16,
			18,
			20,
			22,
			24,
			26,
			28,
			30,
			32,
			36,
			48
		],
		supportAllValues: true
	},
	fontColor: {
		colors: [
			{ label: 'Black', color: '#000000' },
			{ label: 'Silver', color: '#C0C0C0' },
			{ label: 'Gray', color: '#808080' },
			{ label: 'Maroon', color: '#800000' },
			{ label: 'Red', color: '#FF0000' },
			{ label: 'Purple', color: '#800080' },
			{ label: 'Fuchsia', color: '#FF00FF' },
			{ label: 'Green', color: '#008000' },
			{ label: 'Lime', color: '#00FF00' },
			{ label: 'Olive', color: '#808000' },
			{ label: 'Navy', color: '#000080' },
			{ label: 'Yellow', color: '#FFFF00' },
			{ label: 'Blue', color: '#0000FF' },
			{ label: 'Teal', color: '#008080' },
			{ label: 'Aqua', color: '#00FFFF' }
		]
	},
	fontBackgroundColor: {
		colors: [
			{ label: 'Black', color: '#000000' },
			{ label: 'Silver', color: '#C0C0C0' },
			{ label: 'Gray', color: '#808080' },
			{ label: 'Maroon', color: '#800000' },
			{ label: 'Red', color: '#FF0000' },
			{ label: 'Purple', color: '#800080' },
			{ label: 'Fuchsia', color: '#FF00FF' },
			{ label: 'Green', color: '#008000' },
			{ label: 'Lime', color: '#00FF00' },
			{ label: 'Olive', color: '#808000' },
			{ label: 'Navy', color: '#000080' },
			{ label: 'Yellow', color: '#FFFF00' },
			{ label: 'Blue', color: '#0000FF' },
			{ label: 'Teal', color: '#008080' },
			{ label: 'Aqua', color: '#00FFFF' }
		]
	},
	fontFamily: {
		options: [
			'宋体, SimSun',
			'黑体, SimHei',
			'新宋体, NSimSun',
			'仿宋, FangSong',
			'仿宋_GB2312, FangSong_GB2312',
			'华文宋体, STSong',
			'华文仿宋, STFangsong',
			'楷体, KaiTi',
			'华文楷体, STKaiti',
			'隶书, LiSu'
		],
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties'
		]
	},
	ckfinder: {
		// uploadUrl: "http://localhost:8090/Floyd/attachment/uploadImage.do"
	},
	// extraPlugins: [ uploadAdapterPlugin ]
};

// function uploadAdapterPlugin(editor) {
// 	editor.plugins.get('FileRepository').createUploadAdapter = new UploadAdapter
// }
export default Editor;
