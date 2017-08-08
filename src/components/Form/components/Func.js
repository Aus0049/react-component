/**
 * Created by Aus on 2017/8/8.
 */
// 表单添加报错
export function showError (errorText) {
    const errorBox = document.createElement('div');
    errorBox.className = 'zby-form-error';
    errorBox.innerText = errorText;
    document.body.appendChild(errorBox);
}

export function clearError () {
    document.querySelector('.zby-form-error').remove();
}