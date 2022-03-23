import $ from 'jquery'

export default function() {
    // 파일 첨부 버튼 숨기기
    const $file = $('.trix-button-group--file-tools')
    $file.addClass('hidden')
    $file.next().addClass('hidden')
}