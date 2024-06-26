import React from 'react';
import './play_list.less';
import { inject, observer } from 'mobx-react';
import { List, Popover } from 'antd';
import { IMusicStore } from '../../../store/music_store';
import { IMusic } from '../../../utils/interface';
import { TimeFormatter } from '@github-music-player/core';

interface IProps {
    musicStore: IMusicStore;
}
@inject('musicStore')
@observer
export class PlayList extends React.Component<Partial<IProps>> {
    constructor(props: IProps) {
        super(props);
    }

    public render(): React.ReactElement {
        const { player, deleteMusic, clearMusicList } = this.props.musicStore!;
        const { musicList, playingIndex, setPlayingIndex } = player;
        return (
            <div className='play-list' title='播放列表'>
                <Popover
                    content={
                        <List
                            style={{ height: 300 }}
                            className='play-list-list'
                            header={
                                <div className='title'>
                                    {`播放列表(${musicList.length})`}
                                    <div className='clear-button' aria-hidden onClick={() => clearMusicList()}>
                                        <span className='iconfont icon-delete' />
                                        <span className='text'>清空</span>
                                    </div>
                                </div>
                            }
                            dataSource={musicList.map((item) => item.dump())}
                            renderItem={(item: IMusic, index: number) => (
                                <div
                                    className='list-item'
                                    aria-hidden
                                    style={{ backgroundColor: playingIndex === index ? '#15161a' : undefined }}
                                    onClick={() => setPlayingIndex(index)}>
                                    <div>{playingIndex === index && <span className='iconfont icon-caret-right' />}</div>
                                    <div>{item.name}</div>
                                    <div>
                                        <span
                                            aria-hidden
                                            className='iconfont icon-delete'
                                            onClick={(e) => {
                                                deleteMusic(item.id);
                                                e.stopPropagation();
                                            }}
                                        />
                                    </div>
                                    <div>{item.artist ?? '未知艺术家'}</div>
                                    <div>{TimeFormatter.format(item.duration)}</div>
                                </div>
                            )}
                        />
                    }
                    trigger='click'
                    color='#292929'
                    getPopupContainer={(trigger) => trigger.parentElement!}>
                    <span className='icon-button iconfont icon-playlist-play' />
                </Popover>
            </div>
        );
    }
}
