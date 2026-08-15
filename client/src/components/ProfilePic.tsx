import { createAvatar } from '@dicebear/core';
import {croodlesNeutral, pixelArt, rings, dylan, bigEars, thumbs} from '@dicebear/collection'

// [
//   'adventurer',        'adventurerNeutral',
//   'avataaars',         'avataaarsNeutral',
//   'bigEars',           'bigEarsNeutral',
//   'bigSmile',          'bottts',
//   'botttsNeutral',     'croodles',
//   'croodlesNeutral',   'dylan',
//   'funEmoji',          'glass',
//   'icons',             'identicon',
//   'initials',          'lorelei',
//   'loreleiNeutral',    'micah',
//   'miniavs',           'notionists',
//   'notionistsNeutral', 'openPeeps',
//   'personas',          'pixelArt',
//   'pixelArtNeutral',   'rings',
//   'shapes',            'thumbs',
//   'toonHead'
// ]

//maybe: pixelArt, dylan

function generateAvatar(name: string){
    const avatar = createAvatar(dylan, {
        seed: name,
    });

const svg = avatar.toString();
return svg;
}

type props = {
    username: string;
    size: string
}

export default function ProfilePic({username, size}: props){
        return <div style = {{height: size + 'px', width: size + 'px'}} dangerouslySetInnerHTML={{__html: generateAvatar(username)}}></div>

}

