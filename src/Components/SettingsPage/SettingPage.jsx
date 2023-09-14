import React, { useContext } from 'react';
import { SettingContext } from '../Context/Settings/Settings';
import { Card, Grid, NumberInput, Switch, Text, TextInput } from '@mantine/core';
import Auth from '../auth/Auth';

export default function SettingPage() {
    const { settings, dispatch } = useContext(SettingContext);

    return (
        <Auth capability="create">
            <Grid style={{ width: '80%', margin: 'auto', minHeight: '80vh' }}>
                <Grid.Col xs={12} sm={12}>
                    <Card
                        shadow="xs"
                        padding="md"
                        radius="md"
                        style={{
                            background: '#F5F5F5', 
                            border: '1px solid #E0E0E0',
                        }}
                    >
                        <Text size="xl" weight={700} style={{ marginBottom: '16px' }}>
                            Change Settings
                        </Text>

                        <Switch
                            onChange={(e) => dispatch({ type: 'changeShow', payload: e.currentTarget.checked })}
                            checked={settings.showCompleted}
                            label="Show Completed ToDos"
                            style={{ marginBottom: '16px' }}
                            data-testid="show-completed-switch"
                        />

                        <NumberInput
                            onChange={(value) => dispatch({ type: 'changeTasksNum', payload: value })}
                            placeholder={settings.itemsPerPage}
                            label="Items Per page"
                            style={{ marginBottom: '16px' }}
                            data-testid="items-per-page-input"
                        />

                        <TextInput
                            onChange={(e) => dispatch({ type: 'changeSort', payload: e.target.value })}
                            placeholder={settings.sort}
                            label="Sort Keyword"
                            style={{ marginBottom: '24px' }}
                            data-testid="sort-keyword-input"
                        />
                    </Card>
                </Grid.Col>
                <Grid.Col xs={12} sm={4}>
                    <Card
                        shadow="xs"
                        padding="md"
                        radius="md"
                        style={{
                            background: '#F5F5F5', // Light gray background color
                            border: '1px solid #E0E0E0', // Light gray border
                        }}
                    >
                        <Card.Section>
                            <Text size="xl" weight={700} style={{ marginBottom: '16px' }}>
                                Updated Settings
                            </Text>
                        </Card.Section>
                        <Text style={{ marginBottom: '8px' }}>
                            {settings.showCompleted? 'Show' : 'Hide'} Completed ToDos
                        </Text>
                        <Text style={{ marginBottom: '8px' }}>Items Per page: {settings.itemsPerPage}</Text>
                        <Text>Sort Keyword: {settings.sort}</Text>
                    </Card>
                </Grid.Col>
            </Grid>
        </Auth>
    );
}
