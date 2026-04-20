// Mock data for the IT Equipment Management System

export const mockOrganizations = [
  {
    id: 1,
    name: "Phường Nha Trang",
    type: "Xã/Phường",
    province: "Khánh Hòa",
    blocks: [
      {
        id: 1,
        name: "Đảng ủy",
        departments: [
          { id: 1, name: "Văn phòng Đảng ủy" },
          { id: 2, name: "Ban Tổ chức" },
        ]
      },
      {
        id: 2,
        name: "HĐND",
        departments: [
          { id: 3, name: "Văn phòng HĐND" },
        ]
      },
      {
        id: 3,
        name: "UBND",
        departments: [
          { id: 4, name: "Văn phòng UBND" },
          { id: 5, name: "Phòng Văn hóa" },
          { id: 6, name: "Phòng Kinh tế" },
        ]
      },
      {
        id: 4,
        name: "MTTQVN",
        departments: [
          { id: 7, name: "Văn phòng MTTQVN" },
          { id: 8, name: "Ban Dân vận" },
        ]
      },
    ]
  },
  {
    id: 2,
    name: "Phường Vĩnh Hải",
    type: "Xã/Phường",
    province: "Khánh Hòa",
    blocks: [
      {
        id: 5,
        name: "Đảng ủy",
        departments: [
          { id: 9, name: "Văn phòng Đảng ủy" },
          { id: 10, name: "Ban Tuyên giáo" },
        ]
      },
      {
        id: 6,
        name: "HĐND",
        departments: [
          { id: 11, name: "Văn phòng HĐND" },
        ]
      },
      {
        id: 7,
        name: "UBND",
        departments: [
          { id: 12, name: "Văn phòng UBND" },
          { id: 13, name: "Phòng Tư pháp" },
        ]
      },
      {
        id: 8,
        name: "MTTQVN",
        departments: [
          { id: 14, name: "Văn phòng MTTQVN" },
        ]
      },
    ]
  },
  {
    id: 3,
    name: "Xã Vĩnh Lương",
    type: "Xã/Phường",
    province: "Khánh Hòa",
    blocks: [
      {
        id: 9,
        name: "Đảng ủy",
        departments: [
          { id: 15, name: "Văn phòng Đảng ủy" },
        ]
      },
      {
        id: 10,
        name: "UBND",
        departments: [
          { id: 16, name: "Văn phòng UBND" },
          { id: 17, name: "Phòng Nông nghiệp" },
        ]
      },
    ]
  },
  {
    id: 4,
    name: "Sở Khoa học và Công nghệ",
    type: "Sở/Ngành",
    province: "Khánh Hòa",
    blocks: [
      {
        id: 11,
        name: "MTTQVN",
        departments: [
          { id: 18, name: "Văn phòng Sở" },
          { id: 19, name: "Phòng Quản lý công nghệ" },
          { id: 20, name: "Phòng KHCN cơ sở" },
        ]
      },
    ]
  },
  {
    id: 5,
    name: "Sở Thông tin và Truyền thông",
    type: "Sở/Ngành",
    province: "Khánh Hòa",
    blocks: [
      {
        id: 12,
        name: "MTTQVN",
        departments: [
          { id: 21, name: "Văn phòng Sở" },
          { id: 22, name: "Phòng CNTT" },
          { id: 23, name: "Phòng Báo chí" },
          { id: 24, name: "Phòng Viễn thông" },
        ]
      },
    ]
  },
  {
    id: 6,
    name: "Sở Tài chính",
    type: "Sở/Ngành",
    province: "Khánh Hòa",
    blocks: [
      {
        id: 13,
        name: "MTTQVN",
        departments: [
          { id: 25, name: "Văn phòng Sở" },
          { id: 26, name: "Phòng Ngân sách" },
        ]
      },
    ]
  },
  {
    id: 7,
    name: "Bắc Vân Phong",
    type: "Đặc khu",
    province: "Khánh Hòa",
    blocks: [
      {
        id: 14,
        name: "HĐND",
        departments: [
          { id: 27, name: "Văn phòng BQL" },
          { id: 28, name: "Phòng Quy hoạch" },
        ]
      },
    ]
  },
  {
    id: 8,
    name: "Phường Vĩnh Nguyên",
    type: "Xã/Phường",
    province: "Khánh Hòa",
    blocks: [
      {
        id: 15,
        name: "Đảng ủy",
        departments: [
          { id: 29, name: "Văn phòng Đảng ủy" },
        ]
      },
      {
        id: 16,
        name: "UBND",
        departments: [
          { id: 30, name: "Văn phòng UBND" },
          { id: 31, name: "Phòng Văn hóa" },
        ]
      },
    ]
  },
];

export const mockEquipments = [
  { id: 1, code: "KH-NT-DU-VP-001", org: "Phường Nha Trang", block: "Đảng ủy", dept: "Văn phòng Đảng ủy", group: "Nhóm máy tính", type: "Máy tính để bàn", brand: "Lenovo", model: "ThinkCentre M70", os: "Windows 11 Pro", office: "Office 2021", security: "BKAV Pro", serial: "SN-LNV-001", seller: "Công ty CNTT Khánh Hòa", budget: "Ngân sách tỉnh", budgetCode: "1111/STC", year: 2024, price: 18500000, status: "Đang sử dụng", user: "Nguyễn Văn A", eval1180: "Đáp ứng", eval1138: "Chưa đáp ứng", eval2140: "Đáp ứng" },
  { id: 2, code: "KH-NT-DU-VP-002", org: "Phường Nha Trang", block: "Đảng ủy", dept: "Văn phòng Đảng ủy", group: "Nhóm máy tính", type: "Laptop", brand: "Asus", model: "ExpertBook B1", os: "Windows 10", office: "Office 2019", security: "Windows Defender", serial: "SN-ASU-002", seller: "FPT Shop Khánh Hòa", budget: "Ngân sách tỉnh", budgetCode: "2222/STC", year: 2023, price: 25500000, status: "Đang sử dụng", user: "Trần Thị B", eval1180: "Chưa đáp ứng", eval1138: "Đáp ứng", eval2140: "Chưa đáp ứng" },
  { id: 3, code: "KH-NT-DU-VP-003", org: "Phường Nha Trang", block: "Đảng ủy", dept: "Văn phòng Đảng ủy", group: "Nhóm máy tính", type: "Máy tính bảng", brand: "Xiaomi", model: "Pad 6 Pro", os: "Android 14", office: "WPS Office", security: "BKAV Mobile", serial: "SN-XIA-003", seller: "Cellphones Khánh Hòa", budget: "Ngân sách tỉnh", budgetCode: "1111/STC", year: 2024, price: 15000000, status: "Đang sử dụng", user: "Lê Văn C", eval1180: "Đáp ứng", eval1138: "Chưa đáp ứng", eval2140: "Đáp ứng" },
  { id: 4, code: "KH-NT-DU-VP-004", org: "Phường Nha Trang", block: "Đảng ủy", dept: "Văn phòng Đảng ủy", group: "Nhóm máy tính", type: "Máy mật", brand: "Dell", model: "OptiPlex 7010", os: "Windows 11 Enterprise", office: "Office 2021", security: "Kaspersky Endpoint", serial: "SN-DEL-004", seller: "Công ty Bảo mật CP", budget: "Ngân sách tỉnh", budgetCode: "2222/STC", year: 2024, price: 24000000, status: "Đang sử dụng", user: "Phạm Thị D", eval1180: "Chưa đáp ứng", eval1138: "Đáp ứng", eval2140: "Chưa đáp ứng" },
  { id: 5, code: "KH-NT-DU-VP-005", org: "Phường Nha Trang", block: "Đảng ủy", dept: "Văn phòng Đảng ủy", group: "Nhóm máy in", type: "Máy in", brand: "HP", model: "LaserJet Pro", os: "Firmware 1.0", office: "HP Smart", security: "HP Secure Print", serial: "SN-HP-005", seller: "TBVP Nha Trang", budget: "Ngân sách địa phương", budgetCode: "3333/STC", year: 2023, price: 8500000, status: "Đang sử dụng", user: "Nguyễn Văn E", eval1180: "Đáp ứng", eval1138: "Chưa đáp ứng", eval2140: "Đáp ứng" },
  { id: 6, code: "KH-NT-UB-VP-006", org: "Phường Nha Trang", block: "UBND", dept: "Văn phòng UBND", group: "Nhóm máy tính", type: "Máy tính để bàn", brand: "HP", model: "ProDesk 400", os: "Windows 10 Pro", office: "Office 2019", security: "BKAV Pro", serial: "SN-HP-006", seller: "Công ty CNTT Khánh Hòa", budget: "Ngân sách tỉnh", budgetCode: "3333/STC", year: 2022, price: 16000000, status: "Đang sử dụng", user: "Hoàng Văn F", eval1180: "Đáp ứng", eval1138: "Đáp ứng", eval2140: "Đáp ứng" },
  { id: 7, code: "KH-NT-UB-VP-007", org: "Phường Nha Trang", block: "UBND", dept: "Phòng Văn hóa", group: "Nhóm thiết bị mạng", type: "Bộ phát WiFi", brand: "TP-Link", model: "Archer AX73", os: "TP-Link Firmware", office: "N/A", security: "WPA3 Enterprise", serial: "SN-TPL-007", seller: "FPT Shop", budget: "Ngân sách địa phương", budgetCode: "4444/STC", year: 2024, price: 3200000, status: "Đang sử dụng", user: "Nguyễn Thùy H", eval1180: "Đáp ứng", eval1138: "Đáp ứng", eval2140: "Đáp ứng" },
  { id: 8, code: "KH-VH-UB-VP-008", org: "Phường Vĩnh Hải", block: "UBND", dept: "Văn phòng UBND", group: "Nhóm máy tính", type: "Laptop", brand: "Dell", model: "Latitude 5540", os: "Windows 11 Pro", office: "Office 2021", security: "BKAV Pro", serial: "SN-DEL-008", seller: "Dell Việt Nam", budget: "Ngân sách tỉnh", budgetCode: "4444/STC", year: 2024, price: 28000000, status: "Đang sử dụng", user: "Trương Thị G", eval1180: "Đáp ứng", eval1138: "Đáp ứng", eval2140: "Đáp ứng" },
  { id: 9, code: "KH-VH-UB-TP-009", org: "Phường Vĩnh Hải", block: "UBND", dept: "Phòng Tư pháp", group: "Nhóm máy in", type: "Máy photocopy", brand: "Canon", model: "imageRUNNER 2630i", os: "Canon Firmware", office: "N/A", security: "Canon Secure Print", serial: "SN-CAN-009", seller: "Canon Việt Nam", budget: "Ngân sách địa phương", budgetCode: "5555/STC", year: 2023, price: 45000000, status: "Đang sử dụng", user: "Vũ Minh K", eval1180: "Đáp ứng", eval1138: "Chưa đáp ứng", eval2140: "Đáp ứng" },
  { id: 10, code: "KH-SKHCN-VP-010", org: "Sở Khoa học và Công nghệ", block: "MTTQVN", dept: "Phòng CNTT", group: "Nhóm máy tính", type: "Máy tính để bàn", brand: "Dell", model: "OptiPlex 7090", os: "Windows 11 Pro", office: "Office 365", security: "Kaspersky", serial: "SN-DEL-010", seller: "Dell Việt Nam", budget: "Ngân sách tỉnh", budgetCode: "5555/STC", year: 2024, price: 22000000, status: "Đang sử dụng", user: "Nguyễn Văn H", eval1180: "Đáp ứng", eval1138: "Đáp ứng", eval2140: "Đáp ứng" },
  { id: 11, code: "KH-STTTT-VP-011", org: "Sở Thông tin và Truyền thông", block: "MTTQVN", dept: "Phòng CNTT", group: "Nhóm thiết bị mạng", type: "Switch", brand: "Cisco", model: "Catalyst 2960-X", os: "Cisco IOS 15.2", office: "N/A", security: "ACL/BGP", serial: "SN-CIS-011", seller: "Cisco Việt Nam", budget: "Ngân sách tỉnh", budgetCode: "6666/STC", year: 2023, price: 35000000, status: "Đang sử dụng", user: "Lê Thành L", eval1180: "Đáp ứng", eval1138: "Đáp ứng", eval2140: "Đáp ứng" },
  { id: 12, code: "KH-STTTT-ATTT-012", org: "Sở Thông tin và Truyền thông", block: "MTTQVN", dept: "Phòng An toàn thông tin", group: "Nhóm thiết bị mạng", type: "Firewall", brand: "Fortinet", model: "FortiGate 100F", os: "FortiOS 7.2", office: "N/A", security: "FortiGuard", serial: "SN-FTN-012", seller: "Fortinet Việt Nam", budget: "Ngân sách tỉnh", budgetCode: "7777/STC", year: 2024, price: 85000000, status: "Đang sử dụng", user: "Nguyễn Hồng M", eval1180: "Đáp ứng", eval1138: "Đáp ứng", eval2140: "Đáp ứng" },
  { id: 13, code: "KH-VL-UB-VP-013", org: "Xã Vĩnh Lương", block: "UBND", dept: "Văn phòng UBND", group: "Nhóm máy tính", type: "Máy tính để bàn", brand: "Lenovo", model: "ThinkCentre M90", os: "Windows 10 Pro", office: "Office 2016", security: "Windows Defender", serial: "SN-LNV-013", seller: "FPT Shop", budget: "Ngân sách địa phương", budgetCode: "0001/STC", year: 2020, price: 12000000, status: "Hỏng", user: "Đặng Văn N", eval1180: "Chưa đáp ứng", eval1138: "Chưa đáp ứng", eval2140: "Chưa đáp ứng" },
  { id: 14, code: "KH-STC-VP-014", org: "Sở Tài chính", block: "MTTQVN", dept: "Phòng Ngân sách", group: "Nhóm máy tính", type: "Laptop", brand: "HP", model: "EliteBook 840", os: "Windows 11 Pro", office: "Office 365", security: "BKAV Pro", serial: "SN-HP-014", seller: "HP Việt Nam", budget: "Ngân sách tỉnh", budgetCode: "8888/STC", year: 2024, price: 30000000, status: "Đang sử dụng", user: "Lê Thị I", eval1180: "Đáp ứng", eval1138: "Đáp ứng", eval2140: "Đáp ứng" },
  { id: 15, code: "KH-BVP-UB-QH-015", org: "Đặc khu Bắc Vân Phong", block: "UBND", dept: "Phòng Quy hoạch", group: "Nhóm thiết bị lưu trữ", type: "NAS", brand: "Synology", model: "DS1621+", os: "Synology DSM 7.3", office: "N/A", security: "Synology Active Backup", serial: "SN-SYN-015", seller: "Synology Việt Nam", budget: "Ngân sách tỉnh", budgetCode: "9999/STC", year: 2024, price: 42000000, status: "Đang sử dụng", user: "Phan Thị O", eval1180: "Đáp ứng", eval1138: "Đáp ứng", eval2140: "Đáp ứng" },
];

// Stats derived from the 13,695 records Excel file
export const mockStats = {
  totalEquipments: 13695,
  totalOrgs: 83,
  totalValue: 248800000000,
  activeCount: 12850,
  activePercent: 93.8,
  brokenCount: 520,
  brokenPercent: 3.8,
  maintenanceCount: 325,
  maintenancePercent: 2.4,
};

export const mockChartByOrg = [
  { name: "P. Nha Trang", value: 2800 },
  { name: "P. Vĩnh Hải", value: 1500 },
  { name: "X. Vĩnh Lương", value: 800 },
  { name: "Sở KHCN", value: 650 },
  { name: "Sở TTTT", value: 1200 },
  { name: "Sở Tài chính", value: 500 },
  { name: "Bắc Vân Phong", value: 350 },
  { name: "P. Vĩnh Nguyên", value: 700 },
];

export const mockChartByBlock = [
  { name: "UBND", value: 5200 },
  { name: "Đảng ủy", value: 3800 },
  { name: "HĐND", value: 1200 },
  { name: "MTTQVN", value: 595 },
];

export const mockChartByGroup = [
  { name: "Nhóm máy tính", value: 6500, color: "#3b82f6" },
  { name: "Nhóm máy in", value: 2800, color: "#10b981" },
  { name: "Nhóm thiết bị họp trực tuyến", value: 1500, color: "#f59e0b" },
  { name: "Nhóm LED/màn hình thông báo", value: 1200, color: "#ef4444" },
  { name: "Nhóm thiết bị mạng", value: 1695, color: "#8b5cf6" },
];

export const mockChartByYear = [
  { year: 2019, count: 450 },
  { year: 2020, count: 820 },
  { year: 2021, count: 1350 },
  { year: 2022, count: 2100 },
  { year: 2023, count: 3800 },
  { year: 2024, count: 5175 },
];