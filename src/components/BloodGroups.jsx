// src/components/BloodGroups.jsx
import { Box, Typography, Card, CardMedia, CardContent, Chip, Stack, Grid } from "@mui/material";
import { useState } from "react";

const bloodGroups = [
    {
        type: "O-",
        image: "/O-.jpg",
        percentage: "6.6%",
        canDonateTo: ["Tất cả nhóm máu"],
        canReceiveFrom: ["O-"],
        components: {
            redCells: {
                canDonateTo: ["Tất cả nhóm máu"],
                canReceiveFrom: ["O-"]
            },
            plasma: {
                canDonateTo: ["O-", "O+"],
                canReceiveFrom: ["Tất cả nhóm máu"]
            },
            platelets: {
                canDonateTo: ["Tất cả nhóm máu"],
                canReceiveFrom: ["O-"]
            }
        }
    },
    {
        type: "O+",
        image: "/O+.jpg",
        percentage: "37.5%",
        canDonateTo: ["O+", "A+", "B+", "AB+"],
        canReceiveFrom: ["O-", "O+"],
        components: {
            redCells: {
                canDonateTo: ["O+", "A+", "B+", "AB+"],
                canReceiveFrom: ["O-", "O+"]
            },
            plasma: {
                canDonateTo: ["O+"],
                canReceiveFrom: ["O-", "O+"]
            },
            platelets: {
                canDonateTo: ["O+", "A+", "B+", "AB+"],
                canReceiveFrom: ["O-", "O+"]
            }
        }
    },
    {
        type: "A-",
        image: "/A-.jpg",
        percentage: "6.3%",
        canDonateTo: ["A-", "A+", "AB-", "AB+"],
        canReceiveFrom: ["O-", "A-"],
        components: {
            redCells: {
                canDonateTo: ["A-", "A+", "AB-", "AB+"],
                canReceiveFrom: ["O-", "A-"]
            },
            plasma: {
                canDonateTo: ["A-", "A+"],
                canReceiveFrom: ["Tất cả nhóm máu"]
            },
            platelets: {
                canDonateTo: ["A-", "A+", "AB-", "AB+"],
                canReceiveFrom: ["O-", "A-"]
            }
        }
    },
    {
        type: "A+",
        image: "/A+.jpg",
        percentage: "26.3%",
        canDonateTo: ["A+", "AB+"],
        canReceiveFrom: ["O-", "O+", "A-", "A+"],
        components: {
            redCells: {
                canDonateTo: ["A+", "AB+"],
                canReceiveFrom: ["O-", "O+", "A-", "A+"]
            },
            plasma: {
                canDonateTo: ["A+"],
                canReceiveFrom: ["A-", "A+"]
            },
            platelets: {
                canDonateTo: ["A+", "AB+"],
                canReceiveFrom: ["O-", "O+", "A-", "A+"]
            }
        }
    },
    {
        type: "B-",
        image: "/B-.jpg",
        percentage: "1.5%",
        canDonateTo: ["B-", "B+", "AB-", "AB+"],
        canReceiveFrom: ["O-", "B-"],
        components: {
            redCells: {
                canDonateTo: ["B-", "B+", "AB-", "AB+"],
                canReceiveFrom: ["O-", "B-"]
            },
            plasma: {
                canDonateTo: ["B-", "B+"],
                canReceiveFrom: ["Tất cả nhóm máu"]
            },
            platelets: {
                canDonateTo: ["B-", "B+", "AB-", "AB+"],
                canReceiveFrom: ["O-", "B-"]
            }
        }
    },
    {
        type: "B+",
        image: "/B+.jpg",
        percentage: "9.4%",
        canDonateTo: ["B+", "AB+"],
        canReceiveFrom: ["O-", "O+", "B-", "B+"],
        components: {
            redCells: {
                canDonateTo: ["B+", "AB+"],
                canReceiveFrom: ["O-", "O+", "B-", "B+"]
            },
            plasma: {
                canDonateTo: ["B+"],
                canReceiveFrom: ["B-", "B+"]
            },
            platelets: {
                canDonateTo: ["B+", "AB+"],
                canReceiveFrom: ["O-", "O+", "B-", "B+"]
            }
        }
    },
    {
        type: "AB-",
        image: "/AB-.jpg",
        percentage: "0.6%",
        canDonateTo: ["AB-", "AB+"],
        canReceiveFrom: ["O-", "A-", "B-", "AB-"],
        components: {
            redCells: {
                canDonateTo: ["AB-", "AB+"],
                canReceiveFrom: ["O-", "A-", "B-", "AB-"]
            },
            plasma: {
                canDonateTo: ["Tất cả nhóm máu"],
                canReceiveFrom: ["AB-", "AB+"]
            },
            platelets: {
                canDonateTo: ["AB-", "AB+"],
                canReceiveFrom: ["O-", "A-", "B-", "AB-"]
            }
        }
    },
    {
        type: "AB+",
        image: "/AB+.jpg",
        percentage: "2.5%",
        canDonateTo: ["AB+"],
        canReceiveFrom: ["Tất cả nhóm máu"],
        components: {
            redCells: {
                canDonateTo: ["AB+"],
                canReceiveFrom: ["Tất cả nhóm máu"]
            },
            plasma: {
                canDonateTo: ["Tất cả nhóm máu"],
                canReceiveFrom: ["AB+"]
            },
            platelets: {
                canDonateTo: ["AB+"],
                canReceiveFrom: ["Tất cả nhóm máu"]
            }
        }
    }
];

const BloodGroupCard = ({ group, expanded, onClick }) => (
    <Card
        sx={{ width: expanded ? 400 : 260, flexShrink: 0, m: 2, borderRadius: 7, boxShadow: 8, cursor: "pointer", transition: 'width 0.3s' }}
        onClick={onClick}
    >
        <CardMedia
            component="img"
            height="180"
            image={group.image}
            alt={`Nhóm máu ${group.type}`}
            sx={{ objectFit: "contain", p: 2 }}
        />
        <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="h4" color="error" fontWeight="bold">
                Nhóm máu {group.type}
            </Typography>
        </Box>
        {expanded && (
            <CardContent>
                <Typography fontSize={20} fontWeight="bold">
                    Tỉ lệ dân số: <span style={{ fontWeight: 700 }}>{group.percentage}</span>
                </Typography>
                <Typography mt={2} fontWeight="bold" fontSize={18}>
                    Có thể cho:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.5}>
                    {group.canDonateTo.map((to, idx) => (
                        <Chip key={idx} label={to} color="primary" size="medium" sx={{ fontSize: 16, height: 32 }} />
                    ))}
                </Stack>
                <Typography mt={2} fontWeight="bold" fontSize={18}>
                    Có thể nhận:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.5}>
                    {group.canReceiveFrom.map((from, idx) => (
                        <Chip key={idx} label={from} color="success" size="medium" sx={{ fontSize: 16, height: 32 }} />
                    ))}
                </Stack>
                {/* Thông tin truyền/nhận theo thành phần máu */}
                <Box mt={3}>
                    <Typography fontWeight="bold" fontSize={18} color="secondary.main">
                        Truyền/nhận theo thành phần máu:
                    </Typography>
                    {[
                        { key: 'redCells', label: 'Hồng cầu' },
                        { key: 'plasma', label: 'Huyết tương' },
                        { key: 'platelets', label: 'Tiểu cầu' }
                    ].map((comp, idx) => (
                        <Box key={comp.key} mt={1}>
                            <Typography fontWeight="bold" fontSize={16}>
                                {comp.label}
                            </Typography>
                            <Typography fontSize={16}>
                                Có thể cho: {group.components[comp.key].canDonateTo.join(', ')}
                            </Typography>
                            <Typography fontSize={16}>
                                Có thể nhận: {group.components[comp.key].canReceiveFrom.join(', ')}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        )}
    </Card>
);

export default function BloodGroups() {
    const [expandedIdx, setExpandedIdx] = useState(null);

    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
                Lựa chọn nhóm máu của bạn
            </Typography>

            {expandedIdx === null ? (
                <Grid container spacing={2} justifyContent="center">
                    {bloodGroups.map((group, idx) => (
                        <Grid item xs={12} sm={6} md={3} key={idx} display="flex" justifyContent="center">
                            <BloodGroupCard
                                group={group}
                                expanded={false}
                                onClick={() => setExpandedIdx(idx)}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box display="flex" justifyContent="center">
                    <BloodGroupCard
                        group={bloodGroups[expandedIdx]}
                        expanded={true}
                        onClick={() => setExpandedIdx(null)}
                    />
                </Box>
            )}
        </Box>
    );
}