'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area'); 
/**
 * 指定した要素の子供をすべて削除する
 * @param {HTMLElement} HTMLの要素
 */
function removeAllChildren(element){
    //子要素がない場合はwhile文が実行されず、falseとなる。
    while(element.firstChild) {
        //親の要素があるかぎり削除
        element.removeChild(element.firstChild)
    }
}
//Enterボタンを押下した時の処理を記載した関数
userNameInput.onkeydown = event => {
    if(event.key == 'Enter'){
        assessmentButton.onclick();
    }
}
//診断ボタンを押した時の処理テキストボックスを持ってくる
assessmentButton.onclick = () => {
    //console.log('ボタンが押されました。');
    let userNameInputvalue = userNameInput.value;//入力された名前を表示できるのでこれを診断関数にいれる。
    if (userNameInputvalue == 0){
        alert('文字を入力してください!!');
        return;
    }
    //最初の要素があれば削除する
    removeAllChildren(resultDivided);
    //h3タグを生成して、診断結果という文字列を追加
    //名前を入力し、診断結果が戻り値として戻ってきた場合h3タグを生成
    const header = document.createElement('h3');
    //名前を入力し、診断結果が戻り値として戻ってきた場合はh3タグの中に診断結果という文字を入れるために生成
    header.innerText='診断結果';
    //h3タグの要素と結果をdivタグの子要素として結果を追加する。
    resultDivided.appendChild(header);
    //pタグを生成して結果を表示する。
    //診断結果関数の戻り値をansに格納
    let ans = assessment(userNameInputvalue);
    //名前を入力し、診断結果を表示するためのpタグを生成
    const paragraph = document.createElement('p');
    //pタグ内に診断結果を記載する。
    paragraph.innerText=ans;
    //pタグの要素と結果をdivタグの子要素として結果を追加する。
    resultDivided.appendChild(paragraph);

    //TODOツイートエリアの作成
    //子要素があればremoveAllChildren関数で子要素を削除する。
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    //tweetのaタグにurlを追加する文言を記載する。考え方はhtmlと一緒。後ほどaタグに追加していく。
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='+encodeURIComponent('あなたのいいところ')+'&ref_src=twsrc%5Etfw'
    //hrefをaタグに追加する
    //jsから、htmlに値を入れたい場合は○○.setAttributeで追加できる。
    anchor.setAttribute('href',hrefValue);//○○.setAttribute('プロパティ',値);
    anchor.className = 'twitter-hashtag-button';//classNameをセット
    //Twitterの文章に診断結果を載せるsetAttributeしてプロパティは'date-text'結果は定数ansにあるのでそれを記載する
    anchor.setAttribute('data-text',ans);
    anchor.innerText = 'Tweet #あなたのいいところ';//テキスト内に文言を記載。
　　//aタグをdividtweetに追加
    tweetDivided.appendChild(anchor);

    //widgets.jsスクリプトを設定して実行するコードを追加して、tweedについかする。
    const script = document.createElement('script');
    //scriptタグにsrcプロパティをsetAttributeで追加してurlを指定する。
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    //tweetのタグにappendchildする。
    tweetDivided.appendChild(script);



    
}
const answers = [
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for(let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    
    //文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName}/g, userName);//正規表現で{userName}を引数のuserNameに変える!!


    return result;
}  
//ボタンが押された時に
console.assert(
    assessment('まさる') === assessment('まさる'),
    'まさるのいいところは決断力です。まさるがする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);