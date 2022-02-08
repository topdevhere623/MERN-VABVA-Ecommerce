import React from 'react';

import {
    Avatar,
    Divider,
    List as MuiList,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListProps as MuiListProps,
    Switch
} from '@mui/material';
import {
    SmsFailed,
    Settings,
    HelpRounded,
    Nightlight,
    LogoutRounded,
    LockClockRounded,
    LockRounded,
    FormatListBulletedRounded,
    FeedRounded,
    LanguageRounded,
    MailOutlineRounded,
    ReportProblemRounded,
    KeyboardOutlined,
    ListAltRounded,
    StarsRounded
} from '@mui/icons-material';
import { MuiCustomLinkedList, MuiCustomLinkedListGroup, MuiCustomLinkedListLink } from '~/mui-custom/LinkedList';

export type ListProps = MuiListProps;

export const List = (props: ListProps) => {
    return <MuiList {...props} />;
};

export const FacebookSettingLinkedList = () => {
    return (
        <MuiCustomLinkedList>
            <MuiCustomLinkedListGroup MenuListProps={{ autoFocus: true, className: 'navigation-list' }}>
                <ListItemButton className="navigation-list__user">
                    <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                        disableTypography={false}
                        primary="Podoprigora Alexandr"
                        secondary="podoprigoraisv@gmail.com"
                        className="u-text-truncate"
                    />
                </ListItemButton>
                <Divider variant="middle" />
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <SmsFailed fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        disableTypography={false}
                        primary="Give Feedback"
                        secondary="Help us improve the new Facebook"
                    />
                </ListItemButton>
                <Divider variant="middle" />
                <MuiCustomLinkedListLink groupKey="setting" groupTitle="Setting &amp; Privacy">
                    <ListItemAvatar>
                        <Avatar>
                            <Settings fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Setting &amp; Privacy" />
                </MuiCustomLinkedListLink>
                <MuiCustomLinkedListLink groupKey="help" groupTitle="Help &amp; Support">
                    <ListItemAvatar>
                        <Avatar>
                            <HelpRounded fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Help &amp; Support" />
                </MuiCustomLinkedListLink>
                <MuiCustomLinkedListLink groupKey="display" groupTitle="Display &amp; Accessebility">
                    <ListItemAvatar>
                        <Avatar>
                            <Nightlight fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Display &amp; Accessebility" />
                </MuiCustomLinkedListLink>
                <Divider variant="middle" />
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <LogoutRounded fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Log Out" />
                </ListItemButton>
            </MuiCustomLinkedListGroup>

            <MuiCustomLinkedListGroup groupKey="setting" MenuListProps={{ autoFocus: true, className: 'navigation-list' }}>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <Settings fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Settings" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <LockClockRounded fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Privacy Checkup" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <LockRounded fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Privacy Shortcuts" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <FormatListBulletedRounded fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Activity Log" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <FeedRounded fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="News Feed Preferences" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <LanguageRounded fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Language" />
                </ListItemButton>
            </MuiCustomLinkedListGroup>

            <MuiCustomLinkedListGroup groupKey="help" MenuListProps={{ autoFocus: true, className: 'navigation-list' }}>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <HelpRounded fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Help Center" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <MailOutlineRounded fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Support Inbox" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <ReportProblemRounded fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Report a Problem" />
                </ListItemButton>
            </MuiCustomLinkedListGroup>

            <MuiCustomLinkedListGroup groupKey="display" MenuListProps={{ autoFocus: true, className: 'navigation-list' }}>
                <ListItemButton tabIndex={-1}>
                    <ListItemAvatar>
                        <Avatar>
                            <Nightlight fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        disableTypography={false}
                        primary="Dark Mode"
                        secondary="Adjust the appearance of Facebook to reduce glare and give your eyes a break."
                    />
                    <ListItemIcon>
                        <Switch color="secondary" tabIndex={0} />
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton tabIndex={-1}>
                    <ListItemAvatar>
                        <Avatar>
                            <ListAltRounded fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        disableTypography={false}
                        primary="Compact Mode"
                        secondary="Make your font size smaller so more content can fit on the screen."
                    />
                    <ListItemIcon>
                        <Switch color="secondary" tabIndex={0} />
                    </ListItemIcon>
                </ListItemButton>
                <MuiCustomLinkedListLink groupKey="display-keyboard" groupTitle="Keyboard">
                    <ListItemAvatar>
                        <Avatar>
                            <KeyboardOutlined fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="Keyboard" />
                </MuiCustomLinkedListLink>
            </MuiCustomLinkedListGroup>

            <MuiCustomLinkedListGroup
                groupKey="display-keyboard"
                MenuListProps={{ autoFocus: true, className: 'navigation-list' }}
            >
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <KeyboardOutlined fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography={false} primary="See All Keyboard Shortcuts" />
                </ListItemButton>
                <ListItemButton tabIndex={-1}>
                    <ListItemAvatar>
                        <Avatar>
                            <StarsRounded fontSize="large" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        disableTypography={false}
                        primary="Use Single-Character Keyboard Shortcuts"
                        secondary="Use single-character shortcuts to perform common actions."
                    />
                    <ListItemIcon>
                        <Switch color="secondary" tabIndex={0} />
                    </ListItemIcon>
                </ListItemButton>
            </MuiCustomLinkedListGroup>
        </MuiCustomLinkedList>
    );
};
