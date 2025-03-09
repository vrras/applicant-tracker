import React, { useEffect, useState } from 'react';
import { Table, Button, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ROLE, STATUS } from '../../utils/constants'

const CandidateCard = ({ data, handleStatus }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <Image src={`https://ui-avatars.com/api/?name=${data.name.replace(' ', '+')}&background=random`} size='small' circular />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '8em' }}>
                <label>Name:</label>
                <p><strong>{data.name}</strong></p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '8.2em' }}>
                <label>Email:</label>
                <a href={`mailto:${data.email}`}>{data.email}</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '6.3em' }}>
                <label>Phone No:</label>
                <p>{data.phone}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '2em' }}>
                <label>Years of Experience:</label>
                <p>{data.yoe}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '3.3em' }}>
                <label>Role Applied For:</label>
                <p>{ROLE[data.role]}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '6.8em' }}>
                <label>Location:</label>
                <p>{data.location.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '7em' }}>
                <label>Resume:</label>
                <a href={data.resumeUrl} target='blank' style={{ cursor: 'pointer' }}>Resume</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '7.8em' }}>
                <label>Status:</label>
                <p><strong>{STATUS[data.status]}</strong></p>
            </div>

            <div class="2 fluid ui buttons">
                <Button color='green' class='fluid ui button' onClick={() => handleStatus(data.id, 'interview-scheduled')}>
                    Schedule Interview
                </Button>
                <Button basic color='green' class='fluid ui button' onClick={() => handleStatus(data.id, 'contacted')}>
                    Review
                </Button>
            </div>
        </div>
    );
};

export default function Read() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [apiData, setApiData] = useState({ data: [], totalRow: 0, totalPage: 0, nextPage: null, previousPage: null });
    const [locationOptions, setLocationOptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [location, setLocation] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');
    const [apiSelected, setApiSelected] = useState(null);

    useEffect(() => {
        axios.get(`${apiUrl}/v1/applicants`, {
            params: {
                page: currentPage,
                limit: itemsPerPage,
                location: location === 'all' ? '' : location,
                role: jobRole === 'all' ? '' : jobRole,
                status: status === 'all' ? '' : status,
                search
            }
        }).then((getData) => {
            setApiData(getData.data);
        })
    }, [currentPage, itemsPerPage, location, jobRole, status, apiUrl, search]);

    useEffect(() => {
        axios.get(`${apiUrl}/v1/option/locations`).then((getData) => {
            setLocationOptions(getData.data.data);
        })
    }, [apiUrl]);

    const setData = (id) => {
        axios.get(`${apiUrl}/v1/applicants/${id}`).then((getData) => {
            setApiSelected(getData.data.data);
        })
    }

    const getData = () => {
        axios.get(`${apiUrl}/v1/applicants`, {
            params: {
                page: currentPage,
                limit: itemsPerPage,
                location: location === 'all' ? '' : location,
                role: jobRole === 'all' ? '' : jobRole,
                status: status === 'all' ? '' : status,
            }
        }).then((getData) => {
            setApiData(getData.data);
        })
    }

    const getDetailData = (id) => {
        axios.get(`${apiUrl}/v1/applicants/${id}`).then((getData) => {
            setApiSelected(getData.data.data);
        })
    }

    const onDelete = (id) => {
        axios.delete(`${apiUrl}/v1/applicants/${id}`)
            .then(() => {
                getData();
            })
    }

    const handleStatus = (id, status) => {
        axios.patch(`${apiUrl}/v1/applicants/${id}`, {
            status
        })
            .then(() => {
                getData();
                getDetailData(id);
            })
    }

    const currentItems = apiData && apiData.data ? apiData.data : [];
    const paginate = (pageNumber) => {
        if (pageNumber) {
            setCurrentPage(pageNumber)
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Link to='/create'>
                    <Button basic color="green">Add Application</Button>
                </Link>
            </div>
            <div className="filters" style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px', marginTop: '10px', gap: '30px' }}>
                <div style={{ display: 'flex', gap: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label>Location</label>
                        <Dropdown
                            placeholder="Select option"
                            selection
                            options={[{ text: 'All', value: 'all' }, ...locationOptions]}
                            value={location}
                            onChange={(e, { value }) => setLocation(value)}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label>Job role</label>
                        <Dropdown
                            placeholder="Select option"
                            selection
                            options={[{ text: 'All', value: 'all' }, ...Object.keys(ROLE).map(key => ({
                                key,
                                text: ROLE[key],
                                value: key
                            }))]}
                            value={jobRole}
                            onChange={(e, { value }) => setJobRole(value)}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label>Status</label>
                        <Dropdown
                            placeholder="Select option"
                            selection
                            options={[{ text: 'All', value: 'all' }, ...Object.keys(STATUS).map(key => ({
                                key,
                                text: STATUS[key],
                                value: key
                            }))]}
                            value={status}
                            onChange={(e, { value }) => setStatus(value)}
                        />
                    </div>
                </div>
                {apiSelected && (<div style={{ display: 'flex', gap: '30px', alignItems: 'flex-end', marginLeft: '20px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Applicant details: </p>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <p style={{ fontSize: '1.2em', fontWeight: 'bolder' }}>{apiSelected.name}</p>
                    </div>
                </div>)}
            </div>
            <div class={`ui ${apiSelected ? 'two' : 'one'} column grid`}>
                <div class="column">
                    <div class="ui segment">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div class="ui icon input">
                                <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                                <i class="search icon"></i>
                            </div>
                            <div className="pagination" style={{ display: 'flex', justifyContent: 'right' }}>
                                <div onClick={() => paginate(apiData.previousPage)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(232,232,232,255)', borderRadius: '5px', marginRight: '7px', paddingTop: '5px', height: '30px', width: '30px' }}>
                                    <i class="angle left icon"></i>
                                </div>
                                <div class="ui large labels">
                                    <div class="ui label">
                                        {apiData.previousPage === null && (apiData.nextPage === null || apiData.nextPage === 2) ? 1 : apiData.previousPage != null && apiData.nextPage === null ? apiData.previousPage + 1 : apiData.nextPage - apiData.previousPage}
                                    </div>
                                </div>
                                <div onClick={() => paginate(apiData.nextPage)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(232,232,232,255)', borderRadius: '5px', paddingLeft: '5px', paddingTop: '5px', height: '30px', width: '30px' }}>
                                    <i class="angle right icon"></i>
                                </div>
                            </div>
                        </div>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>candidate_name</Table.HeaderCell>
                                    <Table.HeaderCell>candidate_email</Table.HeaderCell>
                                    <Table.HeaderCell>applied_role</Table.HeaderCell>
                                    <Table.HeaderCell>application_status</Table.HeaderCell>
                                    <Table.HeaderCell>action</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {currentItems.map((data) => {
                                    return (
                                        <Table.Row key={data.id} style={{ cursor: 'pointer' }} onClick={() => setData(data.id)}>
                                            <Table.Cell>{data.name}</Table.Cell>
                                            <Table.Cell>{data.email}</Table.Cell>
                                            <Table.Cell>{ROLE[data.role]}</Table.Cell>
                                            <Table.Cell>{STATUS[data.status]}</Table.Cell>
                                            <Table.Cell>
                                                <Button color="red" onClick={(e) => { e.stopPropagation(); onDelete(data.id); }}>Delete</Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table>
                        <Dropdown
                            placeholder="Items per page"
                            selection
                            options={[
                                { key: 10, text: '10', value: 10 },
                                { key: 20, text: '20', value: 20 },
                                { key: 50, text: '50', value: 50 }
                            ]}
                            value={itemsPerPage}
                            onChange={(e, { value }) => {
                                setCurrentPage(1)
                                setItemsPerPage(value)
                            }}
                            compact
                        />
                    </div>
                </div>
                {apiSelected && (<div class="column">
                    <div class="ui segment">
                        <CandidateCard data={apiSelected} handleStatus={handleStatus} />
                    </div>
                </div>)}
            </div>
        </div>
    )
}
